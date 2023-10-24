import express from 'express'
import { RecipeController } from '../controller/recipeController'

export const recipeRouter = express.Router()

const recipeController = new RecipeController()
recipeRouter.get("/getAllLikes", recipeController.getAllLikes)
recipeRouter.delete("/:id", recipeController.deleteRecipe)
recipeRouter.get("/all",recipeController.getAll)
recipeRouter.get("/recipesByAuthor/:id", recipeController.getRecipeByAuthor)
recipeRouter.put("/editRecipe/:id", recipeController.editRecipe)
recipeRouter.get("/:id", recipeController.getRecipeById)
recipeRouter.post("/create", recipeController.createRecipe)
recipeRouter.get("/all",recipeController.getAll)
recipeRouter.post("/:recipeId/like", recipeController.likeRecipe)
recipeRouter.delete("/:recipeId/dislike", recipeController.dislikeRecipe)
recipeRouter.get("/getAllLikes", recipeController.getAllLikes)
