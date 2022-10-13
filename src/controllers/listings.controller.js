import mongose from 'mongoose';

import asyncHandler from 'middlewares/asyncMiddleware';
import Listings from 'models/Listings';

const { ObjectId } = mongose.Types;

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
 * @route      GET /api/v1/listings
 * @access     Public
 */
export const getAllListings = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

/*
 * @desc       Get Owner Listings
 * @route      GET /api/v1/listings/owner
 * @access     Private
 */
export const getOwnerListings = asyncHandler(async (req, res) => {
  const user_id = req.user[0]._id;

  const allListings = await Listings.find({
    user: ObjectId(user_id)
  });

  return res.json({
    success: true,
    data: allListings
  });
});
