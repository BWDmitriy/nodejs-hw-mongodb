// src/routers/contacts.js

import {
    Router
} from 'express';
import {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contactsController.js';
import {
    ctrlWrapper
} from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post('/contacts', ctrlWrapper(createContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
