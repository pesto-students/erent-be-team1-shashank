/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/* eslint-disable import/no-import-module-exports */
import jwt from 'jsonwebtoken';

import User from 'models/Users';
import ErrorResponse from 'utils/errorResponse';
import asyncHandler from './asyncMiddleware';

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // set token from bearer token in header
    token = req.headers.authorization.split('Bearer')[1].trim();
  }
  // Set token from cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized.', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.find({ userId: decoded.userId });
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized.', 401));
  }
});

// Grand Access to specific rule
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    return next();
  };

export default protect;
