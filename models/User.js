const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
    unique: true,
  },
  gender : {
    type: String,
    required: true,
  },
});


