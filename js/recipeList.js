class RecipeList {
    constructor(){
    this.allRecipe=[]
    this.allRecipeFiltered=[]
    this.allRecipeIngredient=[]
    this.allRecipeAppliance=[]
    this.allRecipeUstensil=[]
 
    }


    init(recipe) //Start when photograph.html is open
    {  
        this.allRecipe.push(recipe)
       

       
       
    }
    start(){
        this.flexLastRecipe();
        this.buttonStyle();
        this.closeButtonListener();
        this.FilterListener();
        this.textContentIngredient();
        this.textContentAppliance();
        this.textContentUstensil();
        this.FilterIngredientListener();

    }
    flexLastRecipe(){//the last card will go to the left

        document.getElementById(this.allRecipe[this.allRecipe.length-1].id).style.flexGrow="1"
    }

    buttonStyle(){
        var buttonArrow= document.getElementsByClassName("btn-arrow");
        for (var i=0; i< buttonArrow.length; i++){
            buttonArrow[i].addEventListener("click",(e,)=>{this.CloseButton()
               if(e.target ==buttonArrow[0]){ 
                        e.target.previousElementSibling.placeholder="Recherche un ingrédient";
                        e.target.previousElementSibling.classList.add("placeholdercolorblue")}
                else if(e.target == buttonArrow[1]){
                        e.target.previousElementSibling.placeholder="Recherche un appareil";
                        e.target.previousElementSibling.classList.add("placeholdercolorgreen")
        
                }
                else if(e.target == buttonArrow[2]){
                    e.target.previousElementSibling.placeholder="Recherche un ustensil";
                    e.target.previousElementSibling.classList.add("placeholdercolorred")
    
            }
              e.target.parentNode.nextElementSibling.setAttribute("style", "display:flex !important")
             if(this.allRecipeIngredient.length >120){e.target.parentNode.parentNode.style.width="800px";e.target.parentNode.nextElementSibling.style.height="840px"}
            else if(this.allRecipeIngredient.length >40){e.target.parentNode.parentNode.style.width="800px"}
             else if(this.allRecipeIngredient.length >20){e.target.parentNode.parentNode.style.width="50%"}
            else if (this.allRecipeIngredient.length >10){e.target.parentNode.parentNode.style.width="25%"}
            e.stopPropagation()
            
              
            })
        } 
       
    }
   
    closeButtonListener(){
        let input=document.getElementsByTagName("input")
        document.addEventListener("click", (e)=>{
            if(e.target != input[1] || e.target != input[2] || e.target != input[3]){
              this.CloseButton()
              
        }
        })
    }
    CloseButton()
    {
        let btn= document.getElementsByClassName("btni")
        var buttonExtend= document.getElementsByClassName("button-extend")
        for( var i=0; i< btn.length; i++){
            btn[i].style.width="auto";
            btn[i].style.height="71px";
            buttonExtend[i].setAttribute("style", "display:none !important")
         }
         console.log(btn[1].firstElementChild.firstElementChild)
         btn[0].firstElementChild.firstElementChild.classList.remove("placeholdercolorblue")
         btn[0].firstElementChild.firstElementChild.placeholder="Ingrédients";
         btn[1].firstElementChild.firstElementChild.classList.remove("placeholdercolorgreen")
         btn[1].firstElementChild.firstElementChild.placeholder="Appareil";
         btn[2].firstElementChild.firstElementChild.classList.remove("placeholdercolorred")
         btn[2].firstElementChild.firstElementChild.placeholder="Ustensils";

    }
    strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}//The first Letter is capitalize

    FilterListener(){//Listener in the searchbar
        document.getElementsByTagName("input")[0].addEventListener("input",(e)=>{
            this.reinitRecipe();
            this.allRecipeFiltered= [];
            
            if (e.target.value.length >= 3){
                this.FilterAlgo(e.target.value.replace(/é|è|ê/g,"e").toLowerCase())
                this.FilterInterface() 
                } 
            this.textContentIngredient();
            this.textContentAppliance();
            this.textContentUstensil();
                }
            )
        
    }
    FilterIngredientListener(){// the ingredient button listen the input
        document.getElementsByTagName("input")[1].addEventListener("input",(e)=>{
            if (e.target.value.length >= 3){
                this.FilterIngredient(e.target.value.replace(/é|è|ê/g,"e").toLowerCase())     
            }
        })
    }
    FilterPattern(a,e) {// make the array for the specific search in the buttons
        for (let recipe of a){
            for(let ingredient of recipe.ingredients){
            if (ingredient.ingredient.replace(/é|è|ê/g,"e").toLowerCase().includes(e)){
                this.allRecipeFiltered.push(recipe)
                this.allRecipeFiltered=Array.from(new Set(this.allRecipeFiltered));
                
 
                this.allRecipeIngredient.push(this.strUcFirst(ingredient.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
                this.allRecipeIngredient=Array.from(new Set(this.allRecipeIngredient));
                this.allRecipeIngredient.sort();  
                      }          
                  } 
             } 
              for(let ingredient of this.allRecipeIngredient){
                 document.getElementById("ingredientdiv").innerHTML +=  "<li>"+ingredient+"</li>"}
    }
   FilterIngredient(e){//display the ingredient in his div
    document.getElementById("ingredientdiv").innerHTML =""
    this.allRecipeIngredient=[]
    if ( document.getElementsByTagName("input")[0].value.length < 3){
          this.FilterPattern(this.allRecipe,e)
        }else {
            this.FilterPattern(this.allRecipeFiltered,e)
        }   
   }

    FilterAlgo(e){//compare the word in the search bar with the recipList

        for (var i=0; i< this.allRecipe.length; i++){
        let nameRecipe= this.allRecipe[i].name.replace(/é|è|ê/g,"e").toLowerCase();
        let descriptionRecipe= this.allRecipe[i].description.replace(/é|è|ê/g,"e").toLowerCase()
        for(var u=0; u< this.allRecipe[i].ingredients.length; u++){
        let ingredientRecipe= this.allRecipe[i].ingredients[u].ingredient.replace(/é|è|ê/g,"e").toLowerCase()
     if ( nameRecipe.includes(e) || ingredientRecipe.includes(e) || descriptionRecipe.includes(e)) { 
         this.allRecipeFiltered.push(this.allRecipe[i]);
         this.allRecipeFiltered=Array.from(new Set(this.allRecipeFiltered))
        }
        }}
    }
    FilterInterface() {//Display or hide the card
        var cardDeck= document.getElementById("card-deck")
        for(var i=0; i<cardDeck.children.length; i++){
        cardDeck.children[i].style.display ="none"}
        for (let recipe of this.allRecipeFiltered){
            document.getElementById(recipe.id).style.display="flex"}
            if( this.allRecipeFiltered.length == 0){
                document.getElementById("noresult").style.display="block"
        }else {
            document.getElementById("noresult").style.display="none"
            }
        

    }
    reinitRecipe(){//Bring back all the recipe if the search is over or input less than 3 letters
        for (var i=0; i< this.allRecipe.length; i++){
           document.getElementById(this.allRecipe[i].id).style.display= "flex";
        }

    }
   
    arrayAppliance(e){//create the array with all the appliances
        this.allRecipeAppliance=[];
        for (let appliance of e){
            this.allRecipeAppliance.push(this.strUcFirst(appliance.appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
            this.allRecipeAppliance=Array.from(new Set(this.allRecipeAppliance))
            this.allRecipeAppliance.sort()

        }
  
    }
    textContentAppliance(){//display the appliances
        document.getElementById("appliancediv").innerHTML = "";
        if( this.allRecipeFiltered.length == 0){
            this.arrayAppliance(this.allRecipe)
        
        }else {
            this.arrayAppliance(this.allRecipeFiltered)
        }
        for (let appliance of this.allRecipeAppliance){
            document.getElementById("appliancediv").innerHTML +=  "<li>"+appliance+"</li>"
        }
   

    }
    arrayIngredient(e){//create the array with all the ingredients
        this.allRecipeIngredient=[]
        for (let recipe of e){
            for (let ingredient of recipe.ingredients){
                this.allRecipeIngredient.push(this.strUcFirst(ingredient.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
                this.allRecipeIngredient=Array.from(new Set(this.allRecipeIngredient));
                this.allRecipeIngredient.sort();

        }}
  
    }
    textContentIngredient(){//display the ingredients 
        document.getElementById("ingredientdiv").innerHTML = "";
        if( this.allRecipeFiltered.length == 0){
            this.arrayIngredient(this.allRecipe)
           
        }else {

           this.arrayIngredient(this.allRecipeFiltered)
        }
        for( let ingredient of this.allRecipeIngredient){
            document.getElementById("ingredientdiv").innerHTML +=  "<li>"+ingredient+"</li>"
        }
    }
     

   

    arrayUstensil(e){//create the array with all the ustensils
        this.allRecipeAppliance=[];
        for (let recipe of e){
            for (let ustensil of recipe.ustensils){
            this.allRecipeUstensil.push(this.strUcFirst(ustensil.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
            this.allRecipeUstensil=Array.from(new Set(this.allRecipeUstensil))
            this.allRecipeUstensil.sort()
            }
        }
  
    }
    textContentUstensil(){// display the ustensils
        document.getElementById("ustensildiv").innerHTML = "";
        if( this.allRecipeFiltered.length == 0){
            this.arrayUstensil(this.allRecipe)
        
        }else {
            this.arrayUstensil(this.allRecipeFiltered)
        }
        for (let ustensil of this.allRecipeUstensil){
            document.getElementById("ustensildiv").innerHTML +=  "<li>"+ustensil+"</li>"
        }
   

    }














}