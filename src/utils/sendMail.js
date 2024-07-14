// src/utils/sendMail.js

import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
// import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_HOST,
  port: Number(SMTP.SMTP_PORT),
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

// const transporter = nodemailer.createTransport({
//   host: env('SMTP_HOST'),
//   port: Number(env('SMTP_PORT')),
//   auth: {
//     user: env('SMTP_USER'),
//     pass: env('SMTP_PASSWORD'),
//   },
// });

// export const sendEmail = async (options) => {
//   return await transporter.sendMail(options);
// };
