// src/routers/contacts.js

import { Router } from 'express';
import { getContacts, getContact } from '../controllers/contactsController';

const router = Router();

router.get('/contacts', getContacts);
router.get('/contacts/:contactId', getContact);

export default router;
