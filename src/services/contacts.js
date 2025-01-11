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
  if (filter.userId) {
    contactQuery.where('userId').eq(filter.userId);
  }

  const data = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments(
    contactQuery.getFilter(),
  );
  console.log(totalItems);

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (filter) => ContactCollection.findById(filter);

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

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
