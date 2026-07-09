const User = require("../models/User");

// Get All Users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, age } = req.body;

    if (!name || !email || !phone || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, phone, age."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with that email already exists."
      });
    }

    const user = new User({
      name,
      email,
      phone,
      age
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};