// src/controllers/contactsController.js

import {
    getAllContacts
} from "../services/contacts";

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
