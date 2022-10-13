import express from 'express';

// Models
import Listings from 'models/Listings';

// Controllers
import {
  createListing,
  getAllListings,
  getOwnerListings
} from 'controllers/listings.controller';

// Middlewares
import advancedResults from 'middlewares/advanceResults';
import protect from 'middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(protect, createListing)
  .get(advancedResults(Listings, 'user'), getAllListings);

router.route('/owner').get(protect, getOwnerListings);

export default router;
