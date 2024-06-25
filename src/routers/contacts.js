// src/routers/contacts.js

import {
    Router
} from 'express';
import {
    getContacts,
    getContact
} from '../controllers/contactsController';
import {
    ctrlWrapper
} from '../utils/ctrlWrapper';


const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));

export default router;
