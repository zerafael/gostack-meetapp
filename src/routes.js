import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

// Create user
routes.post('/users', UserController.store);

// Create session
routes.post('/sessions', SessionController.store);

// Authentication middleware
routes.use(authMiddleware);

// Update user
routes.put('/users', UserController.update);

export default routes;
