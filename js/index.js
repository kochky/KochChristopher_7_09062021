newRecipeList= new RecipeList()
for(let recipe of Recipes()){
    var newRecipe= new Recipe(recipe);
    newRecipe.init()
    newRecipeList.init(newRecipe);
} 
newRecipeList.start()
      
