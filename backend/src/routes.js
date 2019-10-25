import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import OrganizingController from './app/controllers/OrganizingController';
import MeetupController from './app/controllers/MeetupController';

import authMiddleware from './app/middleware/auth';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

// Create user
routes.post('/users', UserController.store);

// Create session
routes.post('/sessions', SessionController.store);

// List meetups
routes.get('/meetups', MeetupController.index);

// Authentication middleware
routes.use(authMiddleware);

// Update user
routes.put('/users', UserController.update);

// Upload file
routes.post('/files', upload.single('file'), FileController.store);

// Create meetup
routes.post('/meetups', MeetupController.store);
// Update meetup
routes.put('/meetups/:id', MeetupController.update);
// Cancel meetup
routes.delete('/meetups/:id', MeetupController.delete);

// List meetups the user is organizing
routes.get('/organizing', OrganizingController.index);

// List all user's subscriptions
routes.get('/subscriptions', SubscriptionController.index);
// Subscribe to a meetup
routes.post('/subscription/:id', SubscriptionController.store);
// Unsubscribe from a meetup
routes.delete('/subscription/:id', SubscriptionController.delete);

export default routes;
