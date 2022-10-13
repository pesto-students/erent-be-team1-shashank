import express from 'express';

// Models
import Listings from 'models/Listings';

// Controllers
import advancedResults from 'middlewares/advanceResults';
import { createListing, getAllListings } from 'controllers/listings.controller';
import protect from 'middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(protect, createListing)
  .get(advancedResults(Listings, 'user'), getAllListings);

export default router;
