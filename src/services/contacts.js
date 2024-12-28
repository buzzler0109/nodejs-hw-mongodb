import { ContactCollection } from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactQuery = ContactCollection.find();
  if (filter.type) {
    contactQuery.where('contactType').eq(filter.type);
  }
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').eq(filter.isFavourite);
  }

  const data = await contactQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

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
