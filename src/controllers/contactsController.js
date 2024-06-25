// src/controllers/contactsController.js

import {
    getAllContacts,
    getContactById
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
            return res.status(404).json({
                status: "error",
                message: `Contact with id ${contactId} not found`,
            });
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
