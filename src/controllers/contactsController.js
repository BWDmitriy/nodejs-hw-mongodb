// src/controllers/contactsController.js

import {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  removeContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const getContacts = async (req, res, next) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;
  const { contacts, totalItems } = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    userId: req.user._id,
  });
  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

export const getContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(
      createHttpError(400, {
        status: 400,
        message: 'Invalid contact ID',
        data: {
          message: 'Invalid contact ID',
        },
      }),
    );
  }

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: {
          message: 'Contact not found',
        },
      }),
    );
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  const contactData = { ...req.body, userId: req.user._id };
  const newContact = await addContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(
      createHttpError(400, {
        status: 400,
        message: 'Invalid contact ID',
        data: {
          message: 'Invalid contact ID',
        },
      }),
    );
  }

  const contactData = req.body;
  const updatedContact = await patchContact(
    contactId,
    contactData,
    req.user._id,
  );

  if (!updatedContact) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: {
          message: 'Contact not found',
        },
      }),
    );
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(
      createHttpError(400, {
        status: 400,
        message: 'Invalid contact ID',
        data: {
          message: 'Invalid contact ID',
        },
      }),
    );
  }

  const deletedContact = await removeContact(contactId, req.user._id);
  if (!deletedContact) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: {
          message: 'Contact not found',
        },
      }),
    );
  }

  res.sendStatus(204);
};
