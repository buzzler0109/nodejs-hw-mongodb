import { ContactCollection } from '../db/models/Contact.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (data) => ContactCollection.create(data);

export const updateContact = async (contactId, data, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    data,
    {
      new: true,
      ...options,
    },
  );
  return result;
};

export const deleteContact = (contactId) =>
  ContactCollection.findOneAndDelete(contactId);
