// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite,
  userId,
}) => {
  const query = { userId };
  if (type) {
    query.contactType = type;
  }
  if (isFavourite !== undefined) {
    query.isFavourite = isFavourite;
  }
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const skip = (page - 1) * perPage;

  // const filterOptions = {};

  // if (type) {
  //   filterOptions.contactType = type;
  // }

  // if (isFavourite !== undefined) {
  //   filterOptions.isFavourite = isFavourite === 'true';
  // }

  const contacts = await ContactsCollection.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage);

  const totalItems = await ContactsCollection.countDocuments(query);
  return { contacts, totalItems };
};

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findById({ _id: contactId, userId });
};

export const addContact = async (payload) => {
  const newContact = await ContactsCollection.create(payload);
  return newContact;
};

export const patchContact = async (contactId, contactData, userId) => {
  return await ContactsCollection.findByIdAndUpdate(
    { _id: contactId, userId },
    contactData,
    { new: true },
  );
};

export const removeContact = async (contactId, userId) => {
  return await ContactsCollection.findByIdAndDelete({ _id: contactId, userId });
};
