const jwt = require('jsonwebtoken');
const { HTTP_STATUS } = require('../../config/constants');

const ValidateToken = async (req, res, next) => {
  try {
    const token = req.headers.Authorization || req.headers.authorization;

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('TOKEN_REQUIRED'),
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

    const user = await User.findOne(decoded.user.id);
    console.log(user);
    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('USER_NOT_FOUND'),
      });
    }

    return next();
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      success: req.i18n.__('SUCCESS_FALSE'),
      message: req.i18n.__('INVALID_TOKEN'),
      error: error.message
    });
  }
};

module.exports = ValidateToken;



