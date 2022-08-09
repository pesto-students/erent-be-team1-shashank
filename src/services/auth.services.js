import jwt from 'jsonwebtoken';

import Users from 'models/Users';

import configs from 'configs';

class AuthServices {
  static generateSignedJwtToken({ userId }) {
    return jwt.sign({ userId }, configs.jwtSecret, {
      expiresIn: configs.jwtExpire
    });
  }

  static async googleLogin(decodedValue) {
    const { name, picture, user_id, email } = decodedValue;
    try {
      let user = await Users.findOne({ email });
      // First check if user already exists

      if (!user) {
        // Otherwise create user
        const createdUser = await Users.create({
          name,
          email,
          profilePic: picture,
          userId: user_id
        });

        user = createdUser;
      }

      const jwtToken = AuthServices.generateSignedJwtToken(user);

      // return JWT token
      return {
        token: jwtToken
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }
}

export default AuthServices;
