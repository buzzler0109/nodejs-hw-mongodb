import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/index.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['personal', 'home', 'work'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    createdAt: Date.now,
    updatedAt: Date.now,
    versionKey: false,
  },
);

export const ContactCollection = model('contact', contactSchema);
