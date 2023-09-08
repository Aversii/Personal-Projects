import { UserDatabase } from "../data/dataBase/userDatabase";
import { InvalidRequest_EmailAlreadyUsed, InvalidRequest_ShortName, InvalidRequest_ShortPassword, InvalidRequest_WrongName, MissingParams_InvalidEmail, MissingParams_InvalidEmailType, MissingParams_InvalidName, MissingParams_InvalidPassword } from "../error/customError";
import { LoginUserInputDTO, userInputDTO } from "../model/user";

class UserValidations {
    private static userDB: UserDatabase;

      static validateUserInput(input: userInputDTO):void{     

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
}

export default UserValidations