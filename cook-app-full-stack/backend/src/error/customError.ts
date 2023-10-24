//BASE ERROR

export class CustomError extends Error {
    constructor(public statusCode:number, message:string) {
      super(message);
    };;
};;


//CUSTOM ERRORS

export class InvalidRequest_EmailAlreadyUsed extends CustomError{
    constructor(){
        super(409, "Invalid Request => Email already been registered")
    }
}

export class MissingParams_InvalidName extends CustomError{ 
    constructor(){
        super(409,"Missing Params => Invalid Name");
    };;
};;


export class MissingParams_InvalidEmail extends CustomError{ 
    constructor(){
        super(409,"Missing Params => Invalid Email");
    };;
};;

export class MissingParams_InvalidPhoto extends CustomError{ 
    constructor(){
        super(409,"Missing Params => Invalid photo");
    };;
};;


export class MissingParams_InvalidEmailType extends CustomError{ 
    constructor(){
        super(409,"Missing Params => Invalid Email - Email Must Contain @");
    };;
};;


export class MissingParams_InvalidPassword extends CustomError{ 
    constructor(){
        super(409,"Missing Params => Invalid Password");
    };;
};;


export class InvalidRequest_WrongPassword extends CustomError{ 
    constructor(){
        super(403,"Invalid Data => jhonzeira é lindo");
    };;
};;


export class InvalidRequest_UserNotFound extends CustomError{ 
    constructor(){
        super(404,"Invalid Request => User Not Found");
    };;
};;

export class InvalidRequest_TitleCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Title Field Is Too Big, cant exceed 70 characters");
    };;
};;

export class InvalidRequest_DescriptionCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Description Field Is Too Big, cant exceed 150 characters");
    };;
};;

export class InvalidRequest_CookTimeCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => CookTime Field Is Too Big, cant exceed 20 characters");
    };;
};;

export class InvalidRequest_ServingsCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Servings Field Is Too Big, cant exceed 20 characters");
    };;
};;

export class InvalidRequest_PhotoCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Photo Field Is Too Big, cant exceed 20 characters");
    };;
};;

export class InvalidRequest_InstructionsCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Instructions Field Is Too Big, cant exceed 3000 characters");
    };;
};;

export class InvalidRequest_IngredientsCharacterLimitExceeded extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Ingredients Field Is Too Big, cant exceed 500 characters");
    };;
};;



export class InvalidRequest_EmptyString extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => This Field Cant Be An Empty String");
    };;
};;


export class BadRequest_EmptyTable extends CustomError{ 
    constructor(){
        super(422,"Bad Request => This List Has No Entries So Far");
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

export class InvalidRequest_BigPassword extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => Password Must Contain Less Than 20 characters");
    };;
};;

export class InvalidRequest_SamePassword extends CustomError{ 
    constructor(){
        super(422,"Invalid Request => New Password And Old Password Are The Same, Try Another One");
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

export class NotFound_RecipeNotFound extends CustomError{ 
    constructor(){
        super(404,"Not Found => Recipe Not Found");
    };;
};;

export class NotFound_ThereIsNoRecipe extends CustomError{ 
    constructor(){
        super(404,"Not Found => No Recipes Found For This ID");
    };;
};;



export class  Forbidden_CantChangeOrDelete extends CustomError{
    constructor(){
        super(403, "Forbidden => Cant Delete or Edit Other People Recipes")
    }
}

export class NotFound_ThereIsNoLike extends CustomError{ 
    constructor(){
        super(404,"Not Found => This User Does Not Like Any Recipe Yet");
    };;
};;


