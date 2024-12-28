import Joi from 'joi';

import { typeList } from '../constants/contacts.js';

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid(...typeList),
});

export const updContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
