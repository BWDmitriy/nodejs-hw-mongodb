// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const skip = (page - 1) * perPage;
  const contacts = await ContactsCollection.find().skip(skip).limit(perPage);
  const totalItems = await ContactsCollection.countDocuments();
  return { contacts, totalItems };
};

export const getContactById = async (id) => {
  return await ContactsCollection.findById(id);
};

export const addContact = async (payload) => {
  const newContact = await ContactsCollection.create(payload);
  return newContact;
};

export const patchContact = async (id, contactData) => {
  return await ContactsCollection.findByIdAndUpdate(id, contactData, {
    new: true,
  });
};

export const removeContact = async (id) => {
  return await ContactsCollection.findByIdAndDelete(id);
};
