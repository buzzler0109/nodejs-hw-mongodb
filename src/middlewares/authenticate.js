import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import { UserCollection } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (!bearer || !accessToken) {
    return next(createHttpError(401, 'Auth header should be a type of Bearer'));
  }

  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token has expired'));
  }

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};
