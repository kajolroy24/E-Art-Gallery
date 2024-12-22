import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//token creation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await userModel.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token ,user});
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch {
    console.log(error), res.json({ success: false, message: error.message });
  }
};
//Route for user Register
const registerUser = async (req, res) => {
  // res.json({msg:"Register API Working"})
  try {
    const { name, email, password } = req.body;
    // checking user email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user email already exists" });
    }
    // validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // const token = jwt.sign({email}, process.env.JWT_SECRET);
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};
// Function for list all user
const listUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.json({ success: true, user });
    console.log(user);
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};
// Function for removing user
const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User removed" });
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};
export { loginUser, registerUser, adminLogin, listUsers, removeUser };
