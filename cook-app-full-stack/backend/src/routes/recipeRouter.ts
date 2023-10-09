import express from 'express'
import { RecipeController } from '../controller/recipeController'

export const recipeRouter = express.Router()

const recipeController = new RecipeController()
recipeRouter.get("/recipesByAuthor/:id", recipeController.getRecipeByAuthor)
recipeRouter.post("/create", recipeController.createRecipe)
recipeRouter.get("/all",recipeController.getAll)


