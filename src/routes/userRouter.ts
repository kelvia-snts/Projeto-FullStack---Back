import express from "express";
import { FollowController } from "../controller/user/FollowController";
import { UnfollowController } from "../controller/user/UnfollowController";
import { UserController } from "../controller/user/UserController";

export const userRouter = express.Router();

const userController = new UserController();
const followController = new FollowController();
const unfollowController = new UnfollowController();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/follow", followController.follow);
userRouter.delete("/unfollow", unfollowController.unfollow);
userRouter.get("/profile/:id", userController.getProfile);
