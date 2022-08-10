/* eslint-disable function-paren-newline */
import httpStatus from 'http-status';

import asyncHandler from 'middlewares/asyncMiddleware';
import ErrorResponse from 'utils/errorResponse';
import admin from 'utils/firebase';
import AuthServices from 'services/auth.services';

/*
 * @desc       Login/Signup user
 * @route      POST /api/v1/auth/login
 * @access     Public
 */
export const login = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedValue = await admin.auth().verifyIdToken(token);
  if (!decodedValue) {
    throw new ErrorResponse('Invalid Authentication', httpStatus.UNAUTHORIZED);
  }

  const response = await AuthServices.googleLogin(decodedValue);

  if (response.error) {
    throw new ErrorResponse(response.error, httpStatus.BAD_REQUEST);
  }

  return res.json({
    success: true,
    token: response.token
  });
});

/*
 * @desc       Public
 * @route      POST /api/v1/auth/logout
 * @access     Public
 */
export const logout = asyncHandler(async (req) => {
  req.logout();
});
