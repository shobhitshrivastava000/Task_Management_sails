const jwt = require('jsonwebtoken');

const ValidateToken = async (req, res, next) => {
  const token = req.headers.Authorization || req.headers.authorization;

  if (!token) {
    res.status(404).send({
      success: false,
      message: 'user not authorized or token is missing',
    });
  }

  const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

  const user = await User.findOne(decoded.user.id);
  console.log(user)
  if (!user) {
    res.status(404).send({
      success: false,
      message: 'user not found!',
    });
  }

  next();
};

module.exports = ValidateToken;
