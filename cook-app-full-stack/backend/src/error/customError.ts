//BASE ERROR

export class CustomError extends Error {
    constructor(public statusCode:number, message:string) {
      super(message);
    };;
};;


//CUSTOM ERRORS

export class InvalidRequest_EmailAlreadyUsed extends CustomError{
    constructor(){
        super(404, "Invalid Request => Email already been registered")
    }
}

export class MissingParams_InvalidName extends CustomError{ 
    constructor(){
        super(422,"Missing Params => Invalid Name");
    };;
};;


export class MissingParams_InvalidEmail extends CustomError{ 
    constructor(){
        super(422,"Missing Params => Invalid Email");
    };;
};;


export class MissingParams_InvalidEmailType extends CustomError{ 
    constructor(){
        super(422,"Missing Params => Invalid Email - Email Must Contain @");
    };;
};;


export class MissingParams_InvalidPassword extends CustomError{ 
    constructor(){
        super(422,"Missing Params => Invalid Password");
    };;
};;


export class InvalidRequest_WrongPassword extends CustomError{ 
    constructor(){
        super(403,"Invalid Data => Password Does Not Match");
    };;
};;


export class InvalidRequest_UserNotFound extends CustomError{ 
    constructor(){
        super(404,"Invalid Request => User Not Found");
    };;
};;


export class InvalidRequest_EmptyString extends CustomError{ 
    constructor(){
        super(404,"Invalid Request => Email field cant bem empty!");
    };;
};;


export class BadRequest_EmptyTable extends CustomError{ 
    constructor(){
        super(404,"Bad Request => This List Has No Entries So Far");
    };;
};;


export class Forbbiden_Unauthorized extends CustomError{ 
    constructor(){
        super(403,"Forbbiden => Only admin users can explore this feature");
    };;
};;


export class InvalidRequest_WrongName extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Name cant be empty string");
    };;
};;


export class InvalidRequest_ShortPassword extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Password must contain at least 6 characters");
    };;
};;


export class InvalidRequest_ShortName extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Name must contain at least 3 characters");
    };;
};;

// RECIPES CUSTOM ERRORS

export class InvalidRequest_RecipeNotFound extends CustomError{
    constructor(){
        super(404, "Not Found => Recipe not found")
    }
}

export class MissingParams_InvalidTitle extends CustomError{
    constructor(){
        super(422, "Missing Params => Invalid title")
    }
}
export class MissingParams_InvalidDescription extends CustomError{
    constructor(){
        super(422, "Missing Params => Invalid description")
    }
}
export class  MissingParams_InvalidInstructions extends CustomError{
    constructor(){
        super(422, "Missing Params => Invalid instructions")
    }
}

export class  MissingParams_InvalidIngredients extends CustomError{
    constructor(){
        super(422, "Missing Params => Invalid ingredients")
    }
}

export class  InvalidRequest_ShortTitle extends CustomError{
    constructor(){
        super(422, "Invalid Request => Title must contain at least 5 characters ")
    }
}

export class  InvalidRequest_ShortDescription extends CustomError{
    constructor(){
        super(422, "Invalid Request => Description must contain at least 9 characters ")
    }
}

export class  InvalidRequest_ShortInstructions extends CustomError{
    constructor(){
        super(422, "Invalid Request => instructions must contain at least 15 characters ")
    }
}

export class  Forbidden_ConflictBetweenIds extends CustomError{
    constructor(){
        super(403, "Forbidden => There are issues between author_id and id ")
    }
}

export class NotFound_IdNotFound extends CustomError{ 
    constructor(){
        super(404,"Not Found => ID not found");
    };;
};;
