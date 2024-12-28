import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseFilterParams } from '../utils/filters/parseFilterParams.js';
import { contactTypeList } from '../db/models/Contact.js';

import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseFilterParams(req.query, contactTypeList);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found!`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const updContact = await updateContact(contactId, data);
  if (!updContact) {
    throw createHttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: updContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await deleteContact({ _id: contactId });
  if (!data) {
    throw createHttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(204).send();
};
