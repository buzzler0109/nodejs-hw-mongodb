import { UserCollection } from '../db/models/User.js';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/user.js';

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hash(password, 10);

  return await UserCollection.create({ ...payload, password: hashPass });
};

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + FIFTEEN_MINUTES,
  refreshTokenValidUntil: Date.now() + ONE_DAY,
});

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'User doesn`t exist');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = Date.now() > session.refreshTokenValidUntil;

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  return await SessionCollection.create({
    userId: session._id,
    ...sessionData,
  });
};
