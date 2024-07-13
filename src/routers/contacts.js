// src/routers/contacts.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { validateBody } from '../middlewares/validation.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContact));
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContact));

export default contactsRouter;
