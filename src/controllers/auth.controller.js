import asyncHandler from 'middlewares/asyncMiddleware';
import magicAdmin from 'utils/magicSdk';

/*
 * @desc       Login/Signup user
 * @route      POST /api/v1/auth/login_signup
 * @access     Public
 */
export const login = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { authorization: DIDToken } = req.headers;

  console.log('DIDToken', DIDToken);

  const metadata = await magicAdmin.users.getMetadataByToken(DIDToken);
  console.log(role);
  console.log(metadata);
  return res.json({
    success: true
  });
});

/*
 * @desc       Register user
 * @route      POST /api/v1/auth/register
 * @access     Public
 */
export const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  return res.json({
    success: true
  });
});
