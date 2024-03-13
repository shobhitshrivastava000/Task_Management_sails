/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const { bcrypt, jwt, HTTP_STATUS } = require('../../config/constants');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }
      const userAvailaible = await User.findOne({ email });
      if (userAvailaible) {
        return res.status(HTTP_STATUS.ALREADY_EXISTS).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          msg: req.i18n.__('ALREADY_EXISTS_EMAIL'),
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      }).fetch();

      res.status(HTTP_STATUS.SUCCESS).send({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('SIGNUP'),
        newUser,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }
      const user = await User.findOne({ email });

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('USER_NOT_FOUND'),
        });
      }
      if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESSTOKEN_SECRET,
          { expiresIn: '7d' }
        );
        req.user = user;

        res.status(HTTP_STATUS.SUCCESS).send({
          success: req.i18n.__('SUCCESS_TRUE'),
          message: req.i18n.__('LOGIN'),
          accessToken
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('INVALID_PASSWORD'),
        });
      }
    } catch (error) {
      return res
        .status(HTTP_STATUS.SERVER_ERROR)
        .send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('SERVER_ERROR_USER'), 
          error:error.message
        });
    }
  },
};
