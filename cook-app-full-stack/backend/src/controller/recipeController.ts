import { Request,Response } from "express";
import { RecipeBusiness } from "../business/recipeBusiness";
import { RecipeCreateInputDTO, RecipeEditInputDTO } from "../model/recipe";
import authenticator from "../services/authenticator";
import { CustomError } from "../error/customError";

export class RecipeController{
  private recipeBusiness: RecipeBusiness
  constructor(){
    this.recipeBusiness = new RecipeBusiness();
  };

  public createRecipe = async (req: Request, res: Response) => {
    try {
        let { title, description, instructions, ingredients, photo, cookTime, servings } = req.body
        const token = req.headers.authorization as string
        const recipe: RecipeCreateInputDTO = { title, photo, description, instructions, ingredients, cookTime, servings }      
        await this.recipeBusiness.createRecipe(recipe,token)
    
        res.status(201).send({ message: "Receita cadastrada com sucesso" });
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };

    public getAll= async (req: Request, res: Response)=>{
      try {
        const token = req.headers.authorization as string
  
        const recipes = await this.recipeBusiness.getAllRecipesBusiness(token)
  
        res.status(200).send(recipes)
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };;

    public getRecipeByAuthor = async (req:Request, res:Response)=>{
      try {
        const id= req.params.id
        const token = req.headers.authorization as string 
  
        const result = await this.recipeBusiness.getRecipeByAuthor(id,token)
      
        res.status(200).send(result)
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };

    public getRecipeById= async(req:Request, res:Response)=>{
      try {
        const id = req.params.id
        const token = req.headers.authorization as string
        const result = await this.recipeBusiness.getRecipeById(id,token)
        res.status(200).send(result)
        
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    }

    public editRecipe = async(req:Request, res:Response)=>{
      try {
        const { title,photo, description, cookTime, servings, instructions, ingredients} = req.body
        const {id} = req.params
        const token = req.headers.authorization as string;
        const input:RecipeEditInputDTO  = {title,description,instructions,id,ingredients,photo, cookTime, servings}
        const result = await this.recipeBusiness.editRecipe(input,token)
  
        res.status(200).send({ message: "Recipe has been changed sucesfully" });     
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };

    public deleteRecipe = async(req:Request, res:Response)=>{
      try {
        const {id} = req.params
        const token = req.headers.authorization as string;
        const result = await this.recipeBusiness.deleteRecipe(id,token)

        res.status(200).send({ message: "Recipe has been deleted sucesfully" });          
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };
    public likeRecipe = async (req: Request, res: Response) => {
      try {
        const token = req.headers.authorization as string;
        const { recipeId } = req.params;
        const result = await this.recipeBusiness.likeRecipe(recipeId,token);
  
        res.status(200).send({ message: "Recipe Has Been Liked" });
      } catch (error: any) {
        if (error instanceof CustomError) {
          res.status(error.statusCode || 400).send(error.message);
        } else {
          res.status(400).send(error.message);
        }
      }
    };
  
    public dislikeRecipe = async (req: Request, res: Response) => {
      try {
        const token = req.headers.authorization as string;
        const { recipeId } = req.params;
        const result = await this.recipeBusiness.dislikeRecipe(recipeId,token);
        
        res.status(200).send({ message: "Recipe Has Been Disliked" });
      } catch (error: any) {
        if (error instanceof CustomError) {
          res.status(error.statusCode || 400).send(error.message);
        } else {
          res.status(400).send(error.message);
        }
      }
    };
  
    public getAllLikes= async (req: Request, res: Response)=>{
      try {
        const token = req.headers.authorization as string
        const likes = await this.recipeBusiness.getAllLikes(token)
        
        res.status(200).send(likes);
      }catch (error:any) {
        if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
        }else{res.status(400).send(error.message)}
      }
    };
  

}