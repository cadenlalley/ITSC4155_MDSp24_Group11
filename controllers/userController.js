const User = require('../models/user');
// const bcrypt = require('bcrypt');


exports.showSignup = (req, res) => {
    res.render('./user/signup');
};

exports.signup = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, firstName, lastName, email, password });
  console.log(user);

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
    res.redirect('/user/login');
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  res.status(200).json({ message: 'Logged in successfully', user });
};