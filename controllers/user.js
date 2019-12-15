const mongoose = require('mongoose');
const { User } = require('../models/user');

module.exports.getAllUsers = async (request, response) => {
  const users = await User.find({});
  return response.send(users)
};

module.exports.getUser = async (request, response) => {
  const userId = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) { return response.status(400).send('Invalid object id') }
  const user = await User.findById(userId);
  if (!user) return response.status(404).send('User not found');
  return response.send(user)
};

module.exports.createUser = async (request, response) => {
  console.log(request.body);
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    gender: request.body.gender
  });
  await user.save();
  return response.send(user)
};

module.exports.updateUser = async (request, response) => {
  const userId = request.params.id;
  User.findOneAndUpdate(userId, request.body, { new: true })
    .then(user => {
      return response.send(user)
    })
    .catch(err => {
      return response.status(500).send(err)
    })
};

module.exports.deleteUser = async (request, response) => {
  const userId = request.params.id;
  await User.findByIdAndDelete(userId);
  return response.send('User deleted')
};
