const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Create user
    const user = new User(req.body);
    await user.save();

    // Generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('Unable to login');
    }

    // Check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send('Unable to login');
    }

    // Generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProfile = async (req, res) => {
    // Assuming the user is attached to the request by the auth middleware
    res.send(req.user);
  };
  
  exports.updateProfile = async (req, res) => {
    // Check for the fields that are allowed to be updated
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'contactNumber', 'address', 'profilePicture'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      // Update the user
      updates.forEach((update) => req.user[update] = req.body[update]);
      await req.user.save();
  
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  };