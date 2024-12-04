import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const userRoute = Router();

userRoute.route("/register-user").post(registerUser);

export default userRoute;