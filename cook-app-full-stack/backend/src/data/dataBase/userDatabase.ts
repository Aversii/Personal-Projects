import { CustomError } from "../../error/customError";
import { TUser } from "../../model/user";
import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_USER = "cookApp_users"
  
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

    public getAllUsers = async  ():Promise <TUser[]>=> {
      try{
        const user = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select('id','name', 'email', 'role')
        .orderBy('name')
        return user        
      }catch (error:any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message)
      }
    };
  
    public findUserByEmail = async (email: string) => {
      try {
        const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select()
        .where({email}) 
        return result[0]
      }catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    };
  
    public findUserById = async (id: string) => {
      try {
        const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select('id','name', 'email', 'role')
        .where({id});  
        return result[0];
      }catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    };
  
  };;