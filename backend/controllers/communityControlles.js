import validator from "validator";
import communityModel from "../models/communityModel.js";
import userModel from "../models/userModel.js";

//Route for member Register
const registerMember = async (req, res) => {
  const { token } = req.headers;
  const { userId } = req.body;

  try {
    const { name, email, address, district, phonenumber, category } = req.body;

    // validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email",
      });
    }
    // checking member email already exists
    // const userExists = await userModel.findOne({ email });

    // if (userExists) {
    //   return res.json({
    //     success: false,
    //     message:
    //       "An account with this email address already exists. ",
    //   });
    // }

    // checking member email already exists in community
    const communityExists = await communityModel.findOne({ email });

    if (communityExists) {
      return res.json({
        success: false,
        message: "You have already joined our community.",
      });
    }

    const newMember = {
      name,
      email,
      address,
      district,
      phonenumber,
      category,
    };
    const community = new communityModel(newMember);
    await community.save();
    res.json({
      success: true,
      message: "Congratulations",
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for list all members
const listMembers = async (req, res) => {
  try {
    const members = await communityModel.find({});
    res.json({ success: true, members });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Function for removing members
const removeMember = async (req, res) => {
  try {
    await communityModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Member removed" });
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};
export { registerMember, listMembers, removeMember };
