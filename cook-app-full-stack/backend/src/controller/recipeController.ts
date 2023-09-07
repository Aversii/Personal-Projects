import { Request,Response } from "express";
import { RecipeBusiness } from "../business/recipeBusiness";
import { RecipeInputDTO } from "../model/recipe";

export class RecipeController{
    private recipeBusiness: RecipeBusiness
    constructor(){
      this.recipeBusiness = new RecipeBusiness();
    };;


    public createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
          let { title, description, instructions, ingredients, photo, cookTime, servings } = req.body;
          const token = req.headers.authorization as string;
          const recipe: RecipeInputDTO = { title, photo, description, instructions, ingredients, cookTime, servings };
      
          await this.recipeBusiness.createRecipe(recipe,token)
      
          res.status(201).send({ message: "Receita cadastrada com sucesso" });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };

      public getAll= async (req: Request, res: Response)=>{
        try {
          const token = req.headers.authorization as string;
    
          const recipes = await this.recipeBusiness.getAllRecipesBusiness(token);
    
          res.status(201).send(recipes);      
        } catch (error:any) {
          res.status(400).send(error.message);
        };
      };;
  
}