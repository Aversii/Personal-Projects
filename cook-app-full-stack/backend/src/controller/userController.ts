import { UserBusiness } from "../business/userBusiness";
import { Request, Response } from "express";
import { LoginUserInputDTO, SignupInputDTO } from "../model/user";
import { CustomError } from "../error/customError";
import { recipeRouter } from "../routes/recipeRouter";

export class UserController {
    private userBusiness: UserBusiness
  constructor(){
    this.userBusiness = new UserBusiness()
  };

  public signup = async (req: Request, res: Response)=>{
    try {
      let { email, name, password, role } = req.body    
      const user : SignupInputDTO = {email,name,password,role}  
      const token = await this.userBusiness.createUser(user)

      res.status(201).send({ message: "Usuário cadastrado com sucesso",token})      
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };

  public login = async (req: Request, res: Response) => {
    try{
      let input:LoginUserInputDTO = {email: req.body.email,password: req.body.password}
      const token = await this.userBusiness.login(input)

      res.status(200).send({ message: "login efetuado!", token })
    }catch (error: any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };

  public getAllUsers= async (req: Request, res: Response)=>{
    try {
      const token = req.headers.authorization as string
      const users = await this.userBusiness.getAllUsers(token)
      
      res.status(200).send(users);
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };

  public getUserById = async (req:Request, res:Response)=>{
    try{
      let {id} = req.params
      const token = req.headers.authorization as string;
      const userById = await this.userBusiness.getUserById(id,token)

      res.status(200).send(userById);
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };

  public changePassword = async (req:Request, res:Response)=>{
    try { 
      const token = req.headers.authorization as string;
      let {newPassword,oldPassword}=req.body
      const changePassword = {newPassword,oldPassword,token}
      const result = await this.userBusiness.changePassword(changePassword,token)
      
      res.status(200).send({ message: "senha modificada com sucesso"})      
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };  


  public followUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const { followedId } = req.params;
      const result = await this.userBusiness.followUser(followedId,token);
      
      res.status(200).send({ message: "User Has Been Followed" });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode || 400).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    }
  };

  public unfollowUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const { unfollowedId } = req.params;
      const result = await this.userBusiness.unfollowUser(unfollowedId,token);
      
      res.status(200).send({ message: "User Has Been Unfollowed" });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode || 400).send(error.message);
      } else {
        res.status(400).send(error.message);
      }
    }
  };

  public getAllFollows= async (req: Request, res: Response)=>{
    try {
      const token = req.headers.authorization as string
      const follows = await this.userBusiness.getAllFollows(token)
      
      res.status(200).send(follows);
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };

  public getFeed = async (req:Request,res:Response)=>{
    try {
      const token = req.headers.authorization as string;
      const result = await this.userBusiness.getFeed(token)
      
      res.status(200).send(result);      
    }catch (error:any) {
      if(error instanceof CustomError){res.status(error.statusCode ||400).send(error.message)
      }else{res.status(400).send(error.message)}
    }
  };;
};;
