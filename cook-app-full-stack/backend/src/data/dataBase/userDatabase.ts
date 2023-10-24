import { CustomError } from "../../error/customError";
import { TRecipe } from "../../model/recipe";
import { TChangePassword, TFollow, TUser } from "../../model/user";
import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_USER = "cookApp_users"
  private static TABLE_FOLLOWS = "cookApp_follows"

  public signup = async (user: TUser): Promise<void> => {
    try {
      await UserDatabase.connection
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role:user.role
      })
      .into(UserDatabase.TABLE_USER)     
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public getAllUsers = async ():Promise <TUser[]>=> {
    try{
      const user = await UserDatabase.connection(UserDatabase.TABLE_USER)
      .select('id','name', 'email', 'role')
      .orderBy('name')

      return user        
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public findUserByEmail = async (email: string):Promise<TUser> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
      .select()
      .where({email})

      return result[0]
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

  public findUserById = async (id: string):Promise<TUser> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
      .select("id","name","email","role")
      .where({id})  

      return result[0]
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

  public changePassword = async(input:TChangePassword):Promise<void>=>{
    try {
      const {id,newPassword}=input
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
      .update({
        password: newPassword
      })
      .where("id","like",id)
      
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

  public followUser = async(input:any):Promise<void>=>{
    try {
      await UserDatabase.connection
      .insert({
        user_id: input.userId,
        target_id: input.followedId,
        followed: input.followed
      })
      .into(UserDatabase.TABLE_FOLLOWS)   
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

  public unfollowUser = async(input:any):Promise<void>=>{
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_FOLLOWS)
      .delete()
      .where("user_id", input.id)
      .andWhere("target_id", input.unfollowedId)
           
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public getAllFollows = async  ():Promise <TFollow[]>=> {
    try{
      const follows = await UserDatabase.connection(UserDatabase.TABLE_FOLLOWS)
      .select("user_id","target_id")

      return follows        
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }
  };

  public getProfileById = async (id: string):Promise<TUser> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select("id", "name", "email")
        .where("id", "like", id);

      return result[0];
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

  public getFeed = async (userId:string):Promise<TRecipe[]>=>{
    try {
      const result = await UserDatabase.connection("cookApp_recipes")
      .join("cookApp_users", "cookApp_users.id","cookApp_recipes.author_id")
      .join("cookApp_follows","cookApp_recipes.author_id","cookApp_follows.target_id")
      .select("cookApp_recipes.id","cookApp_recipes.title","cookApp_recipes.photo","cookApp_recipes.description","cookApp_recipes.servings","cookApp_recipes.cook_time","cookApp_recipes.instructions","cookApp_recipes.created_at","cookApp_recipes.author_id","cookApp_users.name")      
      .where("cookApp_follows.user_id",userId)
      .orderBy("cookApp_recipes.created_at","desc")

      return result      
    }catch (error: any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message);
    }
  };

}

