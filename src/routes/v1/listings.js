import express from 'express';

// Controllers
import { createListing } from 'controllers/listings.controller';
import protect from 'middlewares/auth';

const router = express.Router();

router.route('/').post(protect, createListing);

export default router;
