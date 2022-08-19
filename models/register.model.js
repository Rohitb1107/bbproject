const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// create schema
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
});

// Secure Password
registerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.password2 = undefined;
  }
  next();
});

// create model/collections
const Register = new mongoose.model("Register", registerSchema);

// create documents

// export
module.exports = Register;
