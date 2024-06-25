// src/routers/contacts.js

import {
    Router
} from 'express';
import {
    getContacts,
    getContact,
    createContact,
    updateContact,
} from '../controllers/contactsController.js';
import {
    ctrlWrapper
} from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post('/contacts', ctrlWrapper(createContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));

export default router;
