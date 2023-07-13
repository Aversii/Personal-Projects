import { BadRequest_EmptyTable, CustomError, Forbbiden_Unauthorized, InvalidRequest_EmailAlreadyUsed, InvalidRequest_ShortName, InvalidRequest_ShortPassword, InvalidRequest_UserNotFound, InvalidRequest_WrongName, InvalidRequest_WrongPassword, MissingParams_InvalidEmail, MissingParams_InvalidEmailType, MissingParams_InvalidName, MissingParams_InvalidPassword, NotFound_IdNotFound } from "../error/customError";
import { AuthenticationData } from "../model/authenticationData";
import { LoginUserInputDTO, TUser, userInputDTO } from "../model/user";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import idGenerator from "../services/idGenerator";
import { UserDatabase } from "../data/dataBase/userDatabase";

export class UserBusiness {

  private userDB:UserDatabase
  constructor(){
    this.userDB = new UserDatabase()
  }
  
  public createUser = async (input: userInputDTO) => {
    try {
      let {name, email, password, role} = input
      const checkEmail = await this.userDB.findUserByEmail(email)
      const id =  idGenerator.generatedID()
      const hash = await hashManager.generateHash(password)

      if(checkEmail){throw new InvalidRequest_EmailAlreadyUsed()}
      if(role?.toLocaleUpperCase() !== "NORMAL" && role?.toLocaleUpperCase() !== "ADMIN"){role = "NORMAL"}
      if(role === "admin"){role="ADMIN"}
      if(name === ""){throw new InvalidRequest_WrongName()}
      if(email === ""){throw new InvalidRequest_WrongName()}
      if(password === ""){throw new InvalidRequest_WrongName()};                 
      if(!name){throw new MissingParams_InvalidName()}
      if(!password){throw new MissingParams_InvalidPassword()}
      if(!email.includes("@")){throw new MissingParams_InvalidEmailType()}
      if(!email){throw new MissingParams_InvalidEmail()}
      if(password.length<5){throw new InvalidRequest_ShortPassword()}
      if(name.length<2){throw new InvalidRequest_ShortName()}

      const result :TUser={id,email,password:hash,name,role}

      await this.userDB.signup(result)
      const token = authenticator.generateToken({id,role})

      return token
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    };   
  };

  public login = async (input:LoginUserInputDTO) =>{
    try {
      const {email, password} = input
      if(!email.includes("@")){throw new MissingParams_InvalidEmailType()}
      if(!email) {throw new MissingParams_InvalidEmail()}
      if(!password) {throw new MissingParams_InvalidPassword()}

      const user = await this.userDB.findUserByEmail(email)
      if(!user) {throw new InvalidRequest_UserNotFound()}

      const hashCompare = await hashManager.compareHash(password,user.password)     
      if(!hashCompare){throw new InvalidRequest_WrongPassword()}  

      const payload :AuthenticationData={id: user.id,role: user.role}  
      const token = authenticator.generateToken(payload)

      return token
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)      
    }    
  };

  public getAllUsers =  async (token:string)  =>{
    try {
      const tokenData = authenticator.getTokenData(token)
      const result = await this.userDB.getUserAll()   

      if (tokenData.role !== "ADMIN"){throw new Forbbiden_Unauthorized()}
      if (result.length<0){throw new BadRequest_EmptyTable()}

      return result   
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

  public getUserById = async(id:string)=>{
    try{
      const verifiedId:any = await this.userDB.findUserById(id)
      if(!verifiedId){
        throw new NotFound_IdNotFound()
      }
      return verifiedId
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  }

};;

