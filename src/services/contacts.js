// src/services/contacts.js

import {
    ContactsCollection
} from '../db/models/contact.js';

export const getAllContacts = async () => {
    return await ContactsCollection.find();
};

export const getContactById = async (id) => {
    return await ContactsCollection.findById(id);
};

export const addContact = async (contactData) => {
    const newContact = new ContactsCollection(contactData);
    return await newContact.save();
};
