class RecipeList {
    constructor(){
    this.allRecipe=[]
    this.allRecipeFiltered=[]
    this.allRecipeIngredient=[]
 
    }


    init(recipe) //Start when photograph.html is open
    {  
        this.allRecipe.push(recipe)
       

       
       
    }
    start(){
        this.flexLastRecipe();
        this.buttonStyle();
        this.FilterListener();
        this.textContentIngredient()

    }
    flexLastRecipe(){//the last card will go to the left

        document.getElementById(this.allRecipe[this.allRecipe.length-1].id).style.flexGrow="1"
    }

    buttonStyle(){
        var buttonArrow= document.getElementsByClassName("btn-arrow");
        var buttonExtend= document.getElementsByClassName("button-extend")
        for (var i=0; i< buttonArrow.length; i++){
            buttonArrow[i].addEventListener("click",(e,)=>{
              console.log(this.allRecipeIngredient.length)
              e.target.nextSibling.setAttribute("style", "display:flex !important")
             if(this.allRecipeIngredient.length >120){e.target.parentNode.style.width="800px";e.target.nextSibling.style.height="900px"}
            else if(this.allRecipeIngredient.length >40){e.target.parentNode.style.width="800px";e.target.nextSibling.style.height="1000px"}
             else if(this.allRecipeIngredient.length >20){e.target.parentNode.style.width="50%"}
            else if (this.allRecipeIngredient.length >10){e.target.parentNode.style.width="25%"}
             
     
              
            })
        } 
    }
    FilterListener(){//Listener in the searchbar
        var input= document.getElementsByTagName("input")
        for (var i=0; i< input.length; i++){
        input[i].addEventListener("input",(e)=>{
            this.reinitRecipe()
            if (e.target.value.length >= 3){
           this.FilterAlgo(e.target.value.toLowerCase())}  
                }
            )
        }
    }
   
    FilterAlgo(e){//compare the word in the search bar with the recipList

        for (var i=0; i< this.allRecipe.length; i++){
        let nameRecipe= this.allRecipe[i].name.toLowerCase()
     if (nameRecipe.includes(e)) { 
        }else {
            var cardDeck= document.getElementById("card-deck")
        cardDeck.children[i].style.display ="none"
            }
        }
    }

    reinitRecipe(){//Bring back all the recipe if the search is over or input less than 3 letters
        for (var i=0; i< this.allRecipe.length; i++){
           document.getElementById(this.allRecipe[i].id).style.display= "flex";
        }

    }
   
    ingredientButton(){

    }
    arrayIngredient(){//create the array with all the ingredients
        for (let recipe in this.allRecipe){
            for (let i in this.allRecipe[recipe].ingredients){
            this.allRecipeIngredient.push(this.allRecipe[recipe].ingredients[i].ingredient)
            this.allRecipeIngredient=Array.from(new Set(this.allRecipeIngredient))
            this.allRecipeIngredient.sort()
        }}
  
    }
    textContentIngredient(){
        this.arrayIngredient()
        for( let ingredient of this.allRecipeIngredient){
            document.getElementById("ingredientdiv").innerHTML +=  "<li>"+ingredient+"</li>"
        }
    }
        // this.allRecipe[i].appliance.textContent.includes(e)

        // this.allRecipe[i].description.textContent.includes(e)
        // for (var a=0; i< this.allRecipe[i].ingredients.length; a++){
        //     this.allRecipe[i].ingredients[a].textContent.includes(e);}
        //     for (var u=0; u< this.allRecipe[i].ustensils.length){
        //     this.allRecipe[i].ustensils[u].textContent.includes(e)
        //     }


   















}