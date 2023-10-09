import { CustomError } from "../../error/customError";
import { TRecipe } from "../../model/recipe";
import { BaseDatabase } from "./baseDatabase";

export class RecipeDatabase extends BaseDatabase{
    private static TABLE_RECIPE = "cookApp_recipes"

    async createNewRecipe(recipe: TRecipe): Promise<void> {
        try{
          await RecipeDatabase.connection
          .insert({
            id: recipe.id,
            title: recipe.title,
            photo: recipe.photo,
            description: recipe.description,
            cook_time:recipe.cookTime,
            instructions:recipe.instructions,
            servings: recipe.servings,
            ingredients: recipe.ingredients, 
            author_id: recipe.authorId
          })
          .into(RecipeDatabase.TABLE_RECIPE);
        }catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
       
      }
   

    async getAllRecipes ():Promise <any> {
        try{
          const recipe = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE).select()
          .orderBy("title")
          return recipe
        }catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }    
    }

    async getRecipesByAuthor(authorId:string):Promise<any>{
      try{
        const recipesByAuthor = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE).select().where("author_id",authorId)
        return recipesByAuthor

      }catch (error:any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)
      }  
    }
      
    
    
}