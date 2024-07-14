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
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

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
  const contactData = req.body;
  const newContact = await addContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = req.body;
  const updatedContact = await patchContact(contactId, contactData);

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
  const deletedContact = await removeContact(contactId);
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
