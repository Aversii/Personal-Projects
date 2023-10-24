import express from 'express'
import { UserController } from '../controller/userController'

export const userRouter = express.Router()


const userController = new UserController()

userRouter.get("/feed", userController.getFeed)
userRouter.put("/changePassword", userController.changePassword)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.get("/getAllUsers", userController.getAllUsers)
userRouter.get("/:id/profile", userController.getUserById)
userRouter.post("/:followedId/follow", userController.followUser)
userRouter.delete("/:unfollowedId/unfollow", userController.unfollowUser)
userRouter.get("/getAllFollows", userController.getAllFollows)





