// src/controllers/auth.js

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY * 30),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY * 30),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies);
    const sessionId = req.cookies.sessionId;
    console.log('Session ID:', sessionId);

    if (!sessionId || !isValidObjectId(sessionId)) {
      return next(createHttpError(400, 'Invalid session ID'));
    }

    const sessionExists = await logoutUser(sessionId);

    if (!sessionExists) {
      return next(createHttpError(404, 'Session not found'));
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
};

export const refreshUserSessionController = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies);
    const sessionId = req.cookies.sessionId;
    const refreshToken = req.cookies.refreshToken;
    console.log('Session ID:', sessionId);
    console.log('Refresh Token:', refreshToken);

    if (!sessionId || !refreshToken) {
      return next(createHttpError(400, 'Missing session ID or refresh token'));
    }

    const session = await refreshUsersSession({
      sessionId,
      refreshToken,
    });

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY * 30),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY * 30),
    });

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Refresh session error:', error);
    next(error);
  }
};
