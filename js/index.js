newRecipeList= new RecipeList()
for(let recipe of Recipes()){
    var newRecipe= new Recipe(recipe);
    newRecipe.init()
    newRecipeList.init(newRecipe);
} 
newRecipeList.start()
var cardDeck= document.getElementById("card-deck")
cardDeck.innerHTML += "<div class='card fakecard'></div>"
      
