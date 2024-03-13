/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).send({
          success: true,
          message: 'All fields are required',
        });
      }
      const userAvailaible = await User.findOne({ email });
      if (userAvailaible) {
        return res.status(400).send({
          success: false,
          msg: 'Email already registered',
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      }).fetch();
      res.status(201).json({ _id: newUser.id, email: newUser.email });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Internal Server Errror While Register' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send({
          success: false,
          message: 'All fields aare required',
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'user does not exist' });
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
        res.status(200).json({ accessToken });
      } else {
        res.status(401).send({ msg: 'Email or password is not valid' });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Internal Server Error In Login' });
    }
  },
};
