// src/routers/contacts.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController';
import { validateBody } from '../middlewares/validation';
import { contactSchema } from '../validation/contact';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContact));
contactsRouter.post(
  '/',
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(contactSchema),
  ctrlWrapper(updateContact),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContact));

export default contactsRouter;
