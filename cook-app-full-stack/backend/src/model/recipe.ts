export class Recipe{
    constructor(
        private id: string, 
        private title: string,
        private photo: string,
        private description:string,
        private instructions: string,
        private cookTime:string,
        private servings:string,
        private ingredients:string,
        private createdAt:string,
        private authorId:string
    ){}
    
    getid(){
        return this.id
    }

    getTitle(){
        return this.title
    }

    setTitle(newTitle:string){
        this.title = newTitle
    }

    getPhoto(){
        return this.photo
    }

    setPhoto(newPhoto:string){
        this.photo = newPhoto
    }
    getDescription(){
        return this.description
    }

    setDescription(newDescription:string){
        this.description = newDescription
    }

    getInstructions() {
        return this.instructions
      }

    setInstructions(newInstructions:string){
        this.instructions = newInstructions

    }
    getcookTime(){
        return this.cookTime
    }

    setcookTime(newCookTime:string){
        this.cookTime = newCookTime
    }

    getServings(){
        return this.servings
    }

    setServings(newServings:string){
        this.servings = newServings
    }

    
    getIngredients(){
        return this.ingredients
    }

    setIngredients(newIngredients:string){
        this.ingredients = newIngredients
    }

    getCreatedAt(){
        return this.createdAt
    }


    getAuthorId(){
        return this.authorId
    }

    setAuthorId(newAuthorId:string){
        this.authorId = newAuthorId
    }    
    
}

export type TRecipe  = {
    id: string,
    title: string,
    photo: string,
    description: string,
    cookTime?:string,
    servings?:string,
    ingredients:string,
    instructions:string,
    createdAt?:string,
    authorId:string,
  }

  export interface RecipeInputDTO {
    title: string,
    photo: string,
    description: string,
    instructions:string,
    cookTime?:string,
    servings?:string,
    ingredients:string,
  }