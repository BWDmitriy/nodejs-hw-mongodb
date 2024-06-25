// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getContacts,
  getContact
} from './controllers/contactsController.js';
import router from './routers/contacts.js';
import {
  errorHandler
} from './middlewares/errorHandler.js';
import {
  notFoundHandler
} from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(express.json({
    type: ['application/json', 'application/vnd.api+json']
    // limit: '100kb'
  }));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world! This index page belongs to hw3-crud branch',
    });
  });

  // Реєстрація роута GET /contacts
  app.get('/contacts', getContacts);

  // Реєстрація роута GET /contacts/:contactId
  app.get('/contacts/:contactId', getContact);

  app.use(router); // Додаємо роутер до app як middleware



  app.use('*', notFoundHandler);

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  app.use(errorHandler);

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
