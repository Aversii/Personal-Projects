import { BadRequest_EmptyTable, CustomError, Forbbiden_Unauthorized, InvalidRequest_EmailAlreadyUsed, InvalidRequest_UserNotFound, InvalidRequest_WrongPassword, NotFound_IdNotFound } from "../error/customError";
import { AuthenticationData } from "../model/authenticationData";
import { LoginUserInputDTO, TUser, SignupInputDTO, ChangePasswordInputDTO, TChangePassword, TUnfollow, TFollow, } from "../model/user";
import authenticator from "../services/authenticator";
import hashManager from "../services/hashManager";
import idGenerator from "../services/idGenerator";
import { UserDatabase } from "../data/dataBase/userDatabase";
import {UserInputValidations} from "../validations/userInputsValidations";

export class UserBusiness {

  private userDB:UserDatabase
  constructor(){
    this.userDB = new UserDatabase()
  };
    
  public createUser = async (input: SignupInputDTO):Promise<String> => {
    try {
      let {name, email, password, role} = input
      const id =  idGenerator.generatedID()
      const hash = await hashManager.generateHash(password)
      const user :TUser={id,email,password:hash,name,role}

      UserInputValidations.validateSignupInput(user)      
      const checkEmail = await this.userDB.findUserByEmail(email)      
      if (checkEmail) {throw new InvalidRequest_EmailAlreadyUsed()}      
    
      const result = await this.userDB.signup(user)
      const token = authenticator.generateToken({id,role})
      
      return token
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)
    }   
  };

  public login = async (input:LoginUserInputDTO):Promise<String> =>{
    try {
      const {email, password} = input
      UserInputValidations.validateLoginInput(input)

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

  public getAllUsers =  async (token:string):Promise<TUser[]>  =>{
    try {
      const tokenData = authenticator.getTokenData(token)
      const result = await this.userDB.getAllUsers()
      if (tokenData.role !== "ADMIN"){throw new Forbbiden_Unauthorized()}
      if (result.length<0){throw new BadRequest_EmptyTable()}

      return result   
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

  public getUserById = async(id:string,token:string):Promise<TUser>=>{
    try{
      const tokenData = authenticator.getTokenData(token)
      const verifiedId = await this.userDB.findUserById(id)
      if(!verifiedId){throw new NotFound_IdNotFound()}

      return verifiedId
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

  public changePassword = async(input:ChangePasswordInputDTO, token:string):Promise<void>=>{
    try {
      let {oldPassword,newPassword}=input
      const tokenData = authenticator.getTokenData(token)
      const id = tokenData.id
      UserInputValidations.validadeChangePasswordInput(oldPassword,newPassword)
      
      const verifyId = await this.userDB.findUserById(id)
      if(!verifyId) {throw new InvalidRequest_UserNotFound()}
      const hashCompare = await hashManager.compareHash(oldPassword,verifyId.password)    
      if(!hashCompare){throw new InvalidRequest_WrongPassword()}

      const hash = await hashManager.generateHash(newPassword)
      const changePassword:TChangePassword = {id, newPassword:hash}
      const result = await this.userDB.changePassword(changePassword)
      
      return result   
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

  public followUser = async (followedId:string,token:string):Promise<void>=>{
    try {
      const tokenData = authenticator.getTokenData(token)
      let userId = tokenData.id
      const verifyId:any = await this.userDB.findUserById(followedId)
      if(!verifyId) {throw new InvalidRequest_UserNotFound()}

      const result:any = {userId,followedId}

      const followUser = await this.userDB.followUser(result)
      return followUser

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }  
  };

  public unfollowUser = async (unfollowedId:string,token:string):Promise<void>=>{
    try {
      const tokenData = authenticator.getTokenData(token)
      let id = tokenData.id
      const verifyId:any = await this.userDB.findUserById(unfollowedId)
      if(!verifyId) {throw new InvalidRequest_UserNotFound()}

      const result:TUnfollow = {id,unfollowedId}
      const unfollowUser = await this.userDB.unfollowUser(result)

      return unfollowUser  
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }  
  };

  public getAllFollows =  async (token:string):Promise<TFollow[]> =>{
    try {
      const tokenData = authenticator.getTokenData(token)
      const result = await this.userDB.getAllFollows()
      if (result.length<0){throw new BadRequest_EmptyTable()}

      return result   
    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

  public getFeed = async(token:string):Promise<any[]>=>{
    try {
      const tokenData = authenticator.getTokenData(token);
      const id = tokenData.id 

      const verifyId:any = await this.userDB.findUserById(id)
      if(!verifyId) {throw new InvalidRequest_UserNotFound()}          
      
      const feed = await this.userDB.getFeed(id);    
      if (feed.length<1) {throw new CustomError(200,"User Follows Nobody Yet")};

      return feed;
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage || error.message)    
    }
  };

};;
