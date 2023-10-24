import { RecipeDatabase } from "../data/dataBase/recipeDatabase"
import { UserDatabase } from "../data/dataBase/userDatabase";
import { CustomError, Forbidden_CantChangeOrDelete, InvalidRequest_UserNotFound, MissingParams_InvalidDescription, MissingParams_InvalidInstructions, MissingParams_InvalidTitle, NotFound_IdNotFound, NotFound_RecipeNotFound, NotFound_ThereIsNoLike, NotFound_ThereIsNoRecipe } from "../error/customError";
import { DislikeInputDTO, RecipeCreateInputDTO,  RecipeEditInputDTO,  TLikeRecipe,  TLikes, TRecipe } from "../model/recipe";
import authenticator from "../services/authenticator";
import idGenerator from "../services/idGenerator";
import RecipeValidation from "../validations/recipeInputsValidations";

export class RecipeBusiness{
    private recipeDB:RecipeDatabase
    private userDB:UserDatabase
    constructor(){
      this.recipeDB = new RecipeDatabase()
      this.userDB = new UserDatabase()
    }
    public createRecipe = async (input: RecipeCreateInputDTO, token: string): Promise<void> => {
        try {
          let { title, photo, description, cookTime, servings, ingredients, instructions } = input
          const id = idGenerator.generatedID()
          const tokenData = authenticator.getTokenData(token)
          const authorId = tokenData.id
          const newRecipe: TRecipe = { id, title, photo, description, cookTime, servings, instructions, ingredients, authorId }
          RecipeValidation.validateRecipeInput(newRecipe)

          await this.recipeDB.createNewRecipe(newRecipe)
        } catch (error: any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
      };
    

    public getAllRecipesBusiness=async(token:string):Promise<TRecipe[]>=>{
        try{
          const recipe = await this.recipeDB.getAllRecipes()
          const tokenData = authenticator.getTokenData(token)
          
          return recipe
        } catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
        }
    
      }

      public getRecipeByAuthor = async (authorId:string, token:string):Promise<TRecipe[]>=>{
        try{
          const tokenData = authenticator.getTokenData(token)
          const verifyId = await this.userDB.findUserById(authorId)
          if(!verifyId){throw new NotFound_IdNotFound()}
          const getByAuthor = await this.recipeDB.getRecipesByAuthor(authorId)
          if(getByAuthor.length<1){throw new NotFound_ThereIsNoRecipe()}

          return getByAuthor
        } catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
        }
    }
      public getRecipeById = async(id:string, token:string):Promise<TRecipe>=>{
        try {
          const tokenData = authenticator.getTokenData(token)
          const result = await this.recipeDB.findRecipeById(id)
          if(!result){throw new NotFound_IdNotFound()}

          return result
        } catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
        }
      }

      public deleteRecipe = async(id:string, token:string):Promise<void>=>{
        try {
          const tokenData = authenticator.getTokenData(token)
          let authorId = tokenData.id          

          const verifyId = await this.userDB.findUserById(authorId)
          if(!verifyId){throw new NotFound_IdNotFound()}
          const verify = await this.recipeDB.findRecipeById(id)
          if(!verify){throw new NotFound_ThereIsNoRecipe()}
          const verifyUserRecipe = await this.recipeDB.verifyUserRecipe(authorId,id)
          if(!verifyUserRecipe){throw new Forbidden_CantChangeOrDelete()}

          const result = await this.recipeDB.deleteRecipe(id, authorId)
          
          return result            
        } catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
        
      }
    }

    public editRecipe = async (input:any,token:string):Promise<void>=>{
      try {
        const tokenData = authenticator.getTokenData(token)
        const authorId = tokenData.id as string
        let {id,title,photo,description,cookTime, servings,ingredients,instructions }= input
        let result = {...input,authorId}
        const verifyId = await this.userDB.findUserById(authorId)
        if(!verifyId){throw new NotFound_IdNotFound()}
        const verifyRecipe = await this.recipeDB.findRecipeById(id)
        if(!verifyRecipe){throw new NotFound_ThereIsNoRecipe()}
        const verifyUserRecipe = await this.recipeDB.verifyUserRecipe(authorId,id)
        if(!verifyUserRecipe){throw new Forbidden_CantChangeOrDelete()}


  
        RecipeValidation.validateRecipeInputEdit(result)
        const editRecipe = await this.recipeDB.editRecipe(result)

        return editRecipe        
      } catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
      }
  }

  public likeRecipe = async (recipeId:string,token:string):Promise<void>=>{
    try {
      const tokenData = authenticator.getTokenData(token)
      let id = tokenData.id
      const liked = 1

      const verifyId = await this.userDB.findUserById(id)
      if(!verifyId){throw new NotFound_IdNotFound()}
      const verifyRecipe = await this.recipeDB.findRecipeById(recipeId)
      if(!verifyRecipe){throw new NotFound_ThereIsNoRecipe()}
      const result:TLikeRecipe = {id,recipeId,liked}

      const likeRecipe = await this.recipeDB.likeRecipe(result)

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }

    }

    public dislikeRecipe = async (recipeId:string,token:string):Promise<void>=>{
      try {
        const tokenData = authenticator.getTokenData(token)
        let id = tokenData.id

        const verifyId = await this.userDB.findUserById(id)
        if(!verifyId){throw new NotFound_IdNotFound()}
        const verifyRecipe = await this.recipeDB.findRecipeById(recipeId)
        if(!verifyRecipe){throw new NotFound_ThereIsNoRecipe()}
        const result:TLikeRecipe = {id,recipeId}

        const dislikeRecipe = await this.recipeDB.dislikeRecipe(result)
        return dislikeRecipe
  
      }catch (error:any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
      }
  
    }

    public getAllLikes =  async (token:string):Promise<TLikes[]>=>{
      try {
        const tokenData = authenticator.getTokenData(token)
        const result = await this.recipeDB.getAllLikes()
        if(result.length<1){throw new NotFound_ThereIsNoLike()}

        return result   
      } catch (error:any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
      }
    };
  }

