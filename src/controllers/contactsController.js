// src/controllers/contactsController.js

import {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  removeContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContacts = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contactData = { ...req.body, userId: req.user._id };
    const newContact = await addContact(contactData);

    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
