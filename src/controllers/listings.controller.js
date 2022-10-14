import mongose from 'mongoose';

import asyncHandler from 'middlewares/asyncMiddleware';
import Listings from 'models/Listings';
import ErrorResponse from 'utils/errorResponse';

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

/*
 * @desc       update listing details
 * @route      PUT /api/v1/listings/:slug
 * @access     Private
 */
export const updateListing = asyncHandler(async (req, res, next) => {
  const user_id = req.user[0]._id;
  const { slug } = req.params;

  const findListing = await Listings.findOne({ slug, user: ObjectId(user_id) });

  if (!findListing) {
    return next(new ErrorResponse('No Listing found', 404));
  }

  delete req.body.title;

  await Listings.findByIdAndUpdate(findListing._id, req.body, {
    new: false,
    runValidators: true
  });

  return res.json({
    success: true,
    message: 'Updated Successfully'
  });
});

/*
 * @desc       Delete listing
 * @route      DELETE /api/v1/listings/:slug
 * @access     Private
 */
export const deleteListing = asyncHandler(async (req, res, next) => {
  const user_id = req.user[0]._id;
  const { slug } = req.params;

  const findListing = await Listings.findOne({ slug, user: ObjectId(user_id) });

  if (!findListing) {
    return next(new ErrorResponse('No Listing found', 404));
  }

  findListing.remove();

  return res.json({
    success: true,
    message: 'Deleted Successfully'
  });
});

/*
 * @desc       Get listing details
 * @route      GET /api/v1/listings/:slug
 * @access     Public
 */
export const getListingDetails = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const listingDetails = await Listings.findOne({
    slug
  }).populate('user');

  if (!listingDetails) {
    return next(new ErrorResponse('No Listing found', 404));
  }

  return res.json({
    success: true,
    data: listingDetails
  });
});
