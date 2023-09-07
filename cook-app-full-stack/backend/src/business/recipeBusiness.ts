import { RecipeDatabase } from "../data/dataBase/recipeDatabase"
import { UserDatabase } from "../data/dataBase/userDatabase";
import { CustomError, MissingParams_InvalidDescription, MissingParams_InvalidInstructions, MissingParams_InvalidTitle } from "../error/customError";
import { RecipeInputDTO, TRecipe } from "../model/recipe";
import authenticator from "../services/authenticator";
import idGenerator from "../services/idGenerator";
import RecipeValidation from "../validations/recipeValidations";

export class RecipeBusiness{
    private recipeDB:RecipeDatabase
    private userDB:UserDatabase
    constructor(){
      this.recipeDB = new RecipeDatabase()
      this.userDB = new UserDatabase()
    }
    public createRecipe = async (input: RecipeInputDTO, token: string): Promise<void> => {
        try {
          let { title, photo, description, cookTime, servings, ingredients, instructions } = input;
          const id = idGenerator.generatedID();
          const tokenData = authenticator.getTokenData(token);
          const authorId = tokenData.id;

          const newRecipe: TRecipe = { id, title, photo, description, cookTime, servings, instructions, ingredients, authorId };
          RecipeValidation.validateRecipeInput(newRecipe); 

          await this.recipeDB.createNewRecipe(newRecipe);
        } catch (error: any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
      };
    

    public getAllRecipesBusiness=async(token:string):Promise<any>=>{
        try{
          const recipe = await this.recipeDB.getAllRecpies()
          const tokenData = authenticator.getTokenData(token)
          
          return recipe
        } catch (error:any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
        }
    
      }
}