import express from "express";
import { FollowController } from "../controller/FollowController";
import { UnfollowController } from "../controller/UnfollowController";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();
const followController = new FollowController();
const unfollowController = new UnfollowController();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/follow", followController.follow);
userRouter.delete("/unfollow", unfollowController.unfollow);
