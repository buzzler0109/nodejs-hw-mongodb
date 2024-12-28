import { model, Schema } from 'mongoose';

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const sortByList = Object.keys(ContactSchema.paths);
export const contactTypeList = ['work', 'home', 'personal'];
// export const sortByList = [
//   'name',
//   'phoneNumber',
//   'email',
//   'isFavourite',
//   'contactType',
//   '_id',
// ];

export const ContactCollection = model('contact', ContactSchema);
