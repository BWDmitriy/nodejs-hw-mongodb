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
import { authenticate } from '../middlewares/authenticate';

const contactsRouter = Router();

contactsRouter.get('/', authenticate, ctrlWrapper(getContacts));
contactsRouter.get('/:contactId', authenticate, ctrlWrapper(getContact));
contactsRouter.post(
  '/',
  authenticate,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.patch(
  '/:contactId',
  authenticate,
  validateBody(contactSchema),
  ctrlWrapper(updateContact),
);
contactsRouter.delete('/:contactId', authenticate, ctrlWrapper(deleteContact));

export default contactsRouter;
