import { InvalidRequest_BigPassword, InvalidRequest_SamePassword, InvalidRequest_ShortName, InvalidRequest_ShortPassword, InvalidRequest_WrongName, MissingParams_InvalidEmail, MissingParams_InvalidEmailType, MissingParams_InvalidName, MissingParams_InvalidPassword } from "../error/customError";
import { LoginUserInputDTO, SignupInputDTO } from "../model/user";

export class UserInputValidations {    

      static validateSignupInput(input: SignupInputDTO):void{            
        if(input.role?.toLocaleUpperCase() !== "NORMAL" && input.role?.toLocaleUpperCase() !== "ADMIN"){input.role = "NORMAL"}
        if(input.role === "admin"){input.role="ADMIN"}
        if(input.name === ""){throw new InvalidRequest_WrongName()}
        if(input.email === ""){throw new InvalidRequest_WrongName()}
        if(input.password === ""){throw new InvalidRequest_WrongName()};                 
        if(!input.name){throw new MissingParams_InvalidName()}
        if(!input.password){throw new MissingParams_InvalidPassword()}
        if(!input.email.includes("@")){throw new MissingParams_InvalidEmailType()}
        if(!input.email){throw new MissingParams_InvalidEmail()}
        if(input.password.length<5){throw new InvalidRequest_ShortPassword()}
        if(input.name.length<2){throw new InvalidRequest_ShortName()}
    }

    static validateLoginInput(input: LoginUserInputDTO):void{
        if(!input.email.includes("@")){throw new MissingParams_InvalidEmailType()}
        if(!input.email) {throw new MissingParams_InvalidEmail()}
        if(!input.password) {throw new MissingParams_InvalidPassword()}
    }

    static validadeChangePasswordInput (oldPassword:string, newPassword:string):void{
        if(oldPassword.length<=2){throw new InvalidRequest_ShortPassword()}
        if(oldPassword.length>20){throw new InvalidRequest_BigPassword()}
        if(newPassword.length<=5){throw new InvalidRequest_ShortPassword()}
        if(newPassword.length>20){throw new InvalidRequest_BigPassword()}
        if(newPassword===oldPassword){throw new InvalidRequest_SamePassword()}
    }
}

