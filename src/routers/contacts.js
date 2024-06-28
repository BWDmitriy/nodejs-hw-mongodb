// src/routers/contacts.js

import { Router } from 'express';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validation.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
