import express from 'express';

// Models
import Listings from 'models/Listings';

// Controllers
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingDetails,
  getOwnerListings,
  updateListing
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

router
  .route('/:slug')
  .get(getListingDetails)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

export default router;
