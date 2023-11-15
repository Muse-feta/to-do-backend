const userSchema = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// signup controller
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  if (!username || !email || !password) {
    return res.status(500).json({ message: "please provide all required fields" });
  } else if (password.length < 8) {
    return res.status(500).json({
      message: "password length must be greter than 8 charachter",
    });
  }

  try {
  
    const exsitingUser = await userSchema.findOne({
      $or: [{ username }, { email }],
    });

    if (exsitingUser) {
      return res.status(500).json({ message: "this user alredy existed" });
    }
    const users = await new userSchema({
      username,
      email,
      password: hashPassword,
    });
    users.save();

    res.status(201).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (email.length == "" || password.length == "") {
    return res
      .status(500)
      .json({ message: "please provide all required fields" });
  }
  try {
    const loginUser = await userSchema.findOne({ email });

    const isValidPassword = await bcrypt.compare(password, loginUser.password);

    if (!loginUser) {
      return res.status(500).json({ message: "invalid credential" });
    } 
    if (!isValidPassword) {
      return res.status(500).json({ message: "wrong password" });
    }

    const token = jwt.sign(
      { username: loginUser.username, userid: loginUser._id },
      SECRET_KEY,
      { expiresIn: "5h" }
    );

    // const username = req.user

    return res.status(200).json({
      message: "user login succefully",
      token,
      username: loginUser.username,
      userid: loginUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const checkUser = (req, res) => {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(200).json({ message: "valid user", username, userid });
};

module.exports = { register, login, getUser, checkUser };
