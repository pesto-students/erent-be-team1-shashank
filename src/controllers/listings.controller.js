import asyncHandler from 'middlewares/asyncMiddleware';
import Listings from 'models/Listings';

/*
 * @desc       Create Listing
 * @route      POST /api/v1/listings
 * @access     Private
 */
export const createListing = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user[0]._id;
  req.body.isPremium = false;
  const createdListings = await Listings.create(req.body);
  return res.json({
    success: true,
    data: createdListings
  });
});

/*
 * @desc       Get All Listings
 * @route      POST /api/v1/listings
 * @access     Public
 */
export const getAllListings = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});
