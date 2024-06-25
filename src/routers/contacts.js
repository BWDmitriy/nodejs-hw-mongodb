// src/routers/contacts.js

import {
    Router
} from 'express';
import {
    getContacts,
    getContact
} from '../controllers/contactsController.js';
import {
    ctrlWrapper
} from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));

export default router;
