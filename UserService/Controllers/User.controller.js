const userModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { json } = require("express");

const userController = {
  register: async (req, res) => {
    try {
      const { email, fullname, password } = req.body;

      if (!email || !fullname || !password)
        return res
          .status(400)
          .json({ error: "Please enter complete information" });

      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email has already been registered" });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        email: email,
        fullname: fullname,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res
          .status(400)
          .json({ error: "Please enter complete information" });

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json("Gmail invalid!");
      } else {
        let truePassword = await bcrypt.compare(password, user.password);
        if (!truePassword) {
          return res.status(400).json("Wrong password!");
        } else {
          const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
            expiresIn: "2d",
          });
          return res.status(200).json({
            accessToken: token,
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            userType: user.userType,
          });
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const { userType } = req.user;
      if (userType !== "admin") {
        return res
          .status(403)
          .json("You do not have permission to access this resource");
      } else {
        const users = await userModel.find({});
        return res.status(200).json(users);
      }
    } catch (error) {
      return res.status(500), json(error);
    }
  },

  getUser: async (req, res) => {
    res.status(200).json(req.user);
  },

  updateUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const users = await userModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500), json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { _id } = req.user;
      await userModel.findByIdAndDelete(_id);
      return res.status(200).json("Deleted successfully");
    } catch (error) {
      return res.status(500), json(error);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { _id } = req.user;
      const { newPassword } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await userModel.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true }
      );
      res.status(200).json("Changed password successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { _id } = req.params;
      const user = await userModel.findById(_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
