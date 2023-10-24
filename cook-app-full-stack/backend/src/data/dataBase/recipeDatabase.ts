import { constrainedMemory } from "process";
import { CustomError } from "../../error/customError";
import { TLikeRecipe, TLikes, TRecipe } from "../../model/recipe";
import { BaseDatabase } from "./baseDatabase";

export class RecipeDatabase extends BaseDatabase{
  private static TABLE_RECIPE = "cookApp_recipes"
  private static TABLE_LIKES = "cookApp_likes"


  public createNewRecipe = async (recipe: TRecipe): Promise<void>=>{
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
  };
  

  public getAllRecipes = async():Promise <TRecipe[]>=> {
      try{
        const recipe = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE).select()
        .orderBy("created_at")

        return recipe
      }catch (error:any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)
      }    
  }

  public getRecipesByAuthor = async (authorId:string):Promise<TRecipe[]>=>{
    try{
      const recipesByAuthor = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE).select()
      .where("author_id",authorId)
      
      return recipesByAuthor
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }  
  };
    


  public findRecipeById = async (id: string):Promise<TRecipe> => {
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE)
        .select()
        .where({id})

      return result[0]
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };


  public verifyUserRecipe = async (id: string,recipe_id:string):Promise<TRecipe> => {
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE)
        .select("id")
        .where("author_id","like", id)
        .andWhere("id","like", recipe_id)

      return result[0]
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public editRecipe = async (input:TRecipe):Promise<void>=>{
    try {
      const {id,title,photo,description,cookTime,servings,ingredients,instructions,authorId}=input
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE)
      .update({
        title: title,
        photo:photo,
        description: description,
        cook_time:cookTime,
        servings:servings,
        ingredients: ingredients,
        instructions: instructions,
      })
      .where("id","like",id)
      .andWhere("author_id","like", authorId)

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public deleteRecipe = async(id:string,authorId:string):Promise<void>=>{
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_RECIPE)
      .delete()
      .where("id", id)
      .andWhere("author_id", authorId)
           
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    };
  }


  
  public likeRecipe = async(input:TLikeRecipe):Promise<void>=>{
    try {
      const {id,recipeId,liked} = input
      await RecipeDatabase.connection
      .insert({
        user_id: id,
        recipe_id: recipeId,
        liked: liked
      })
      .into(RecipeDatabase.TABLE_LIKES)   
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  }

  public dislikeRecipe = async(input:TLikeRecipe):Promise<void>=>{
    try {
      const result = await RecipeDatabase.connection(RecipeDatabase.TABLE_LIKES)
      .delete()
      .where("user_id", input.id)
      .andWhere("recipe_id", input.recipeId)
           
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    };
  }

  public getAllLikes = async  ():Promise <TLikes[]>=> {
    try{
      const likes = await RecipeDatabase.connection(RecipeDatabase.TABLE_LIKES)
      .select()

      return likes        
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };
    
    
}
    
    
