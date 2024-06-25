// src/controllers/contactsController.js

import {
    getAllContacts,
    getContactById,
    addContact
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.json({
            status: "success",
            message: "Successfully found contacts!",
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

export const getContact = async (req, res, next) => {
    try {
        const {
            contactId
        } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            return next(createHttpError(404, {
                status: 404,
                message: 'Contact not found',
                data: {
                    message: 'Contact not found'
                }
            }));
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
        const contactData = req.body;
        const newContact = await addContact(contactData);

        res.status(201).json({
            status: "success",
            message: "Successfully created a contact!",
            data: newContact,
        });
    } catch (error) {
        next(error);
    }
};
