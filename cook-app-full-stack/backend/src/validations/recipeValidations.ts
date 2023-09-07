import { InvalidRequest_EmptyString, InvalidRequest_IngredientsCharacterLimitExceeded, InvalidRequest_InstructionsCharacterLimitExceeded, InvalidRequest_PhotoCharacterLimitExceeded, InvalidRequest_TitleCharacterLimitExceeded, MissingParams_InvalidDescription, MissingParams_InvalidIngredients, MissingParams_InvalidInstructions, MissingParams_InvalidPhoto, MissingParams_InvalidTitle } from "../error/customError";
import { RecipeInputDTO } from "../model/recipe";

class RecipeValidation {
    static validateRecipeInput(input: RecipeInputDTO): void {

        
        if (input.title== "" || input.description== "" || input.photo== "" || input.instructions== "" || input.ingredients== "") {
            throw new InvalidRequest_EmptyString();
        }

        if (input.title.length > 70) {
            throw new InvalidRequest_TitleCharacterLimitExceeded();
        }
        
        if (!input.title) {
            throw new MissingParams_InvalidTitle();
        }
        
        if (!input.description) {
            throw new MissingParams_InvalidDescription();
        }

        if (input.description.length > 150) {
            throw new InvalidRequest_TitleCharacterLimitExceeded();
        }

        if (!input.instructions) {
            throw new MissingParams_InvalidInstructions();
        }

        if(input.instructions.length > 3000){
            throw new InvalidRequest_InstructionsCharacterLimitExceeded();
        }

        if(!input.photo){
            throw new MissingParams_InvalidPhoto();
        }
        if(input.photo.length> 200){
            throw new InvalidRequest_PhotoCharacterLimitExceeded();
        }

        if(!input.ingredients){
            throw new MissingParams_InvalidIngredients();
        }

        if(input.ingredients.length> 500){
            throw new InvalidRequest_IngredientsCharacterLimitExceeded();
        }
        if(!input.cookTime || input.cookTime ==""){
            input.cookTime = "not informed"
        }
        if(!input.servings || input.cookTime==""){
            input.servings = "not informed"
        }

    }

}

export default RecipeValidation;
