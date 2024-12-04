import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

// controller for registering the user
const registerUser = asyncHandler(async function (req, res) {
    const { empId, firstname, lastname, email, password } = req.body;
    let inValidValues = false; // variable for checking if any of the required field is empty
    [empId, firstname, lastname, email, password].forEach(i => {
        inValidValues ||= !i?.trim();
    });

    if (inValidValues) throw new ApiError(400, "All fields are required!");

    // Creating user and saving it in database
    const user = await User.create({ empId, firstname, lastname, email, password });

    // Checking if user is created or not. This may look extra a first but becomes a necessity for long term error handlings while creating a user.

    const isUserCreated = await User.findById(user?._id).select("-password");
    if (isUserCreated) return res.status(200).json(apiResponse(200, "User created successfully!", isUserCreated));
    
    // If the user is not created by any chance then a default error while be thrown while ApiError class i.e. Internal Server Error (500).
    throw new ApiError();
});

const userLogIn = asyncHandler(async function(req, res) {
    // The identifier can be email of the usre or empId as well, user can enter any of the two.
    const {identifier, password} = req.body;
    const user = await User.findOne({$or: [{email: identifier}, {empId: identifier}]});
    if (!user) throw new ApiError(404, "User not found");
    if (!user.verifyPassword(password)) throw new ApiError(400, "Invalid password");
    
})

// exporting all the individual controllers here.
export { registerUser };