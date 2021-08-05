class RecipeList {
    constructor(){
    this.allRecipe=[]
    this.allRecipeFiltered=[]
    this.allRecipeIngredient=[]
    this.allRecipeAppliance=[]
    this.allRecipeUstensil=[]
    this.tagArray=[]
    this.allRecipeFilteredProvisional=[]
 
    }


    init(recipe) //Start when photograph.html is open
    {  
        this.allRecipe.push(recipe)    
    }
    start(){
        this.buttonStyle();
        this.closeButtonListener();
        this.FilterListener();
        this.textContentIngredient();
        this.textContentAppliance();
        this.textContentUstensil();
        this.FilterIngredientListener();
        this.FilterApplianceListener();
        this.FilterUstensilListener()
        this.tagCreate()
        this.CloseButton()
    }

    buttonStyle(){
        let buttonArrow= document.getElementsByClassName("btn-arrow");
    
        for (let i=0; i< buttonArrow.length; i++){
            buttonArrow[i].previousElementSibling.addEventListener("click", (e)=>{
            e.stopPropagation()})
            buttonArrow[i].addEventListener("click",(e,)=>{
                this.CloseButton()
                e.target.parentElement.nextElementSibling.setAttribute("style", "display:flex !important")
              
                if(e.target ==buttonArrow[0]){ 
                    
                    e.target.previousElementSibling.placeholder="Recherche un ingrédient";
                    e.target.previousElementSibling.classList.add("placeholdercolorblue")
                    if(this.allRecipeIngredient.length >=3){e.target.parentElement.parentElement.style.width="56%";e.target.parentElement.nextElementSibling.style.height=this.heightResult(this.allRecipeIngredient)}
                    }
                else if(e.target == buttonArrow[1]){ 
                      
                    e.target.previousElementSibling.placeholder="Recherche un appareil";
                    e.target.previousElementSibling.classList.add("placeholdercolorgreen")
                    if(this.allRecipeAppliance.length >=3){e.target.parentElement.parentElement.style.width="56%";e.target.parentElement.nextElementSibling.style.height=this.heightResult(this.allRecipeAppliance)}
                }
                else if(e.target == buttonArrow[2]){
            
                e.target.previousElementSibling.placeholder="Recherche un ustensil";
                e.target.previousElementSibling.classList.add("placeholdercolorred")
                if(this.allRecipeUstensil.length >=3){
                    e.target.parentElement.parentElement.style.width="56%";e.target.parentElement.nextElementSibling.style.height=this.heightResult(this.allRecipeUstensil)}
            }
            e.stopPropagation() 
            })
        }   
    }

    heightResult(e){//Calculate the height necessary for the button expend
        let total = e.length/3*28 +30;
        return total+"px"
    }
   
    closeButtonListener(){//close the button when click outside the buttons
        let input = document.getElementsByTagName("input")
        document.addEventListener("click", (e)=>{
            if(e.target != input[1] || e.target != input[2] || e.target != input[3]){
              this.CloseButton()   
            }
        })
    }

    CloseButton(){//close the search buttons
    
        let btn = document.getElementsByClassName("btni")
        let buttonExtend = document.getElementsByClassName("button-extend")
        for( let i=0; i< btn.length; i++){
            btn[i].style.width="172px";
            btn[i].style.height="71px";
            buttonExtend[i].setAttribute("style", "display:none !important")
        }
         btn[0].firstElementChild.firstElementChild.value='';
         btn[1].firstElementChild.firstElementChild.value='';
         btn[2].firstElementChild.firstElementChild.value='';
         btn[0].firstElementChild.firstElementChild.classList.remove("placeholdercolorblue")
         btn[0].firstElementChild.firstElementChild.placeholder="Ingrédients";
         btn[1].firstElementChild.firstElementChild.classList.remove("placeholdercolorgreen")
         btn[1].firstElementChild.firstElementChild.placeholder="Appareil";
         btn[2].firstElementChild.firstElementChild.classList.remove("placeholdercolorred")
         btn[2].firstElementChild.firstElementChild.placeholder="Ustensils";

    }
    
    strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}//The first Letter is capitalize

    Typo(e){
         return  e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    ChangeButton(e,a){
         if( document.getElementsByTagName("input")[e].parentElement.nextElementSibling.style.display == "flex"){
            if(this.allRecipeIngredient.length >=3){
                document.getElementsByTagName("input")[e].parentElement.parentElement.style.width = "56%";
                document.getElementsByTagName("input")[e].parentElement.nextElementSibling.style.height = this.heightResult(a)}
            else {
                document.getElementsByTagName("input")[e].parentElement.parentElement.style.width="172px";
                document.getElementsByTagName("input")[e].parentElement.nextElementSibling.style.height="71px";
                }
            }
    }

    FilterIngredientListener(){// the ingredient button listen the input
        document.getElementsByTagName("input")[1].addEventListener("input",(e)=>{
            if (e.target.value.length >= 3){
                this.FilterIngredient(e.target.value.replace(/é|è|ê/g,"e").toLowerCase())     
            }else {
                this.textContentIngredient()
            }
            this.ChangeButton(1,this.allRecipeIngredient)
        })
    }

    FilterPatternIngredient(allRecipe,e) {// make the array for the specific search in the buttons
        for (let recipe of allRecipe){
            for(let ingredient of recipe.ingredients){
            if (this.Typo(ingredient.ingredient).includes(this.Typo(e))){
                
                this.allRecipeIngredient.push(this.strUcFirst(this.Typo(ingredient.ingredient)));
                this.allRecipeIngredient=Array.from(new Set(this.allRecipeIngredient));
                this.allRecipeIngredient.sort();  
                }          
            } 
        } 
        for(let ingredient of this.allRecipeIngredient){
             document.getElementById("ingredientdiv").innerHTML +=  '<li>'+ingredient+'</li>'}
    }

    FilterIngredient(e){//display the ingredient in his div
         document.getElementById("ingredientdiv").innerHTML =""
         this.allRecipeIngredient=[]
         if ( document.getElementsByTagName("input")[0].value.length < 3){
            this.FilterPatternIngredient(this.allRecipe,e)
         }else {
            this.FilterPatternIngredient(this.allRecipeFiltered,e)
        }  
     
    }


    FilterApplianceListener(){// the appliance button listen the input
        document.getElementsByTagName("input")[2].addEventListener("input",(e)=>{
            if (e.target.value.length >= 3){
                this.FilterAppliance(this.Typo(e.target.value))     
            }else {
                this.textContentAppliance()}
                this.ChangeButton(2,this.allRecipeAppliance)
        })
    }

    FilterPatternAppliance(allRecipe,element) {// make the array for the specific search in the buttons
        for (let recipe of allRecipe){
            
             if (this.Typo(recipe.appliance).includes(this.Typo(element))){
         
                this.allRecipeAppliance.push(this.strUcFirst(this.Typo(recipe.appliance)));
                this.allRecipeAppliance=Array.from(new Set(this.allRecipeAppliance));
                this.allRecipeAppliance.sort(); 
             }          
                  
        } 
        for(let appliance of this.allRecipeAppliance){
            document.getElementById("appliancediv").innerHTML +=  '<li>'+appliance+'</li>'
        }
    }

    FilterAppliance(element){//display the appliance in his div
        document.getElementById("appliancediv").innerHTML =""
        this.allRecipeAppliance=[]
        if ( document.getElementsByTagName("input")[0].value.length < 3){
            this.FilterPatternAppliance(this.allRecipe,element)
        }else {
            this.FilterPatternAppliance(this.allRecipeFiltered,element)
        }   
    }
    
    FilterUstensilListener(){// the ustensil  button listen the input
        document.getElementsByTagName("input")[3].addEventListener("input",(e)=>{
            if (e.target.value.length >= 3){
                this.FilterUstensil(this.Typo(e.target.value))  
            }else {
                this.textContentUstensil()}
                this.ChangeButton(3,this.allRecipeUstensil)
        })
    }
    FilterPatternUstensil(allRecipe,element) {// make the array for the specific search in the buttons
        for (let recipe of allRecipe){
            for(let ustensil of recipe.ustensils){
                 
                if (this.Typo(ustensil).includes(this.Typo(element))){
                    this.allRecipeUstensil.push(this.strUcFirst(this.Typo(ustensil)));
                    this.allRecipeUstensil=Array.from(new Set(this.allRecipeUstensil));
                    this.allRecipeUstensil.sort();  
                    }          
            } 
        } 
        for(let ustensil of this.allRecipeUstensil){
            document.getElementById("ustensildiv").innerHTML +=  '<li>'+ustensil+'</li>'}
    }
    FilterUstensil(element){//display the ustensil in his div
        document.getElementById("ustensildiv").innerHTML =""
        this.allRecipeUstensil=[]
        if ( document.getElementsByTagName("input")[0].value.length < 3){
            this.FilterPatternUstensil(this.allRecipe,element)
        }else {
            this.FilterPatternUstensil(this.allRecipeFiltered,element)
        }   
    }

   FilterListener(){//Listener in the searchbar
    document.getElementsByTagName("input")[0].addEventListener("input",(e)=>{
        this.reinitRecipe();
        if (e.target.value.length >= 3){
            let t0= performance.now()
            this.FilterAlgo(this.Typo(e.target.value))
            let t1= performance.now()
            console.log(t1- t0)
            this.FilterInterface() 
        } 
        this.textContentIngredient();
        this.textContentAppliance();
        this.textContentUstensil();    
        })
    }

    FilterAlgo(e){//compare the word in the search bar with the recipList
        if(this.tagArray.length ==0){
           
            this.allRecipeFiltered= this.allRecipe.filter(el =>this.Typo(el.name).includes(e) || this.Typo(el.description).includes(e) || el.ingredients.includes(e))
            this.allRecipeFiltered=Array.from(new Set(this.allRecipeFiltered))

        }else { 
        
            this.tagFilter()
            this.allRecipeFilteredProvisional= this.allRecipeFiltered.filter(el =>this.Typo(el.name).includes(e) || this.Typo(el.description).includes(e) || el.ingredients.includes(e))
            this.allRecipeFilteredProvisional=Array.from(new Set(this.allRecipeFilteredProvisional))
            this.allRecipeFiltered=[]
            this.allRecipeFiltered=this.allRecipeFilteredProvisional;
            this.allRecipeFilteredProvisional=[]
        }
    }

    FilterInterface() {//Display or hide the card
        let cardDeck= document.getElementById("card-deck")
        for(let i=0; i<cardDeck.children.length-1; i++){
        cardDeck.children[i].style.display ="none"}
        for (let recipe of this.allRecipeFiltered){
            document.getElementById(recipe.id).style.display="flex"}
            if( this.allRecipeFiltered.length == 0){
                document.getElementById("noresult").style.display="block"
        }else {
            document.getElementById("noresult").style.display="none"
            }
    }

    reinitRecipe(){
       
        if(this.tagArray.length==0 && document.getElementsByTagName("input")[0].value.length ==0){
            this.allRecipeFiltered= [];//Bring back all the recipe if the search is over or input less than 3 letters
            for (let i=0; i< this.allRecipe.length; i++){
                document.getElementById(this.allRecipe[i].id).style.display= "flex";
                document.getElementById("noresult").style.display="none"
            }

        }else if (this.tagArray.length>0 && document.getElementsByTagName("input")[0].value.length == 0){
            this.tagFilter()
            this.FilterInterface()
        
         }else if (document.getElementsByTagName("input")[0].value.length >= 3 ){
            this.FilterAlgo(this.Typo(document.getElementsByTagName("input")[0].value))
            this.FilterInterface()                
        }
    }
   
    arrayAppliance(recipe){//create the array with all the appliances
        this.allRecipeAppliance=[];
        for (let appliance of recipe){
            this.allRecipeAppliance.push(this.strUcFirst(this.Typo(appliance.appliance)))
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

    arrayIngredient(allRecipe){//create the array with all the ingredients
        this.allRecipeIngredient=[]
        for (let recipe of allRecipe){
            for (let ingredient of recipe.ingredients){
                this.allRecipeIngredient.push(this.strUcFirst(this.Typo(ingredient.ingredient)))
                this.allRecipeIngredient=Array.from(new Set(this.allRecipeIngredient));
                this.allRecipeIngredient.sort();
                }
        }
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

    arrayUstensil(recipeArray){//create the array with all the ustensils
        this.allRecipeUstensil=[];
        for (let recipe of recipeArray){
            for (let ustensil of recipe.ustensils){
                this.allRecipeUstensil.push(this.strUcFirst(this.Typo(ustensil)))
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

    tagCreate(){//create the tag when an ingredient is clicked
        let btnExtend = document.getElementsByClassName("button-extend");
        let tagContainer= document.getElementById("tag-container")
        for (let i=0; i< btnExtend.length; i++){
            btnExtend[i].addEventListener("click",(e)=>{
                if(e.target.parentElement== btnExtend[0] && !this.tagArray.includes(this.Typo(e.target.textContent))){
                    tagContainer.innerHTML += "<button class='tag blue'>" +e.target.textContent+"<i class='far fa-times-circle white'></i></button>"
                    this.tagArray.push(this.Typo(e.target.textContent))
                    this.tagArray=Array.from(new Set(this.tagArray))
                    this.FilterAlgoIngredient(this.Typo(e.target.textContent))

                }else if (e.target.parentElement== btnExtend[1] && !this.tagArray.includes(this.Typo(e.target.textContent))){
                    tagContainer.innerHTML += "<button class='tag green'>" +e.target.textContent+"<i class='far fa-times-circle white'></i></button>"
                    this.tagArray.push(this.Typo(e.target.textContent))
                    this.tagArray=Array.from(new Set(this.tagArray))
                    this.FilterAlgoAppliance(this.Typo(e.target.textContent))
                }else if (e.target.parentElement== btnExtend[2] && !this.tagArray.includes(this.Typo(e.target.textContent))){
                    tagContainer.innerHTML += "<button class='tag red'>" +e.target.textContent+"<i class='far fa-times-circle white'></i></button>"
                    this.tagArray.push(this.Typo(e.target.textContent))
                    this.tagArray=Array.from(new Set(this.tagArray))
                    this.FilterAlgoUstensils(this.Typo(e.target.textContent))
                }
                
                e.stopPropagation()
                this.FilterInterface()
                this.tagRemove()
                this.CloseButton()
                this.textContentIngredient();
                this.textContentAppliance();
                this.textContentUstensil();
            })
        }
    }
    
    tagFilter(){//modify the allRecipeFiltered according to the tag activated
        this.allRecipeFiltered=[]
        if (document.getElementsByClassName("tag")[0].className=="tag blue"){
            for( let recipe of this.allRecipe ){
                for (let ingredient of recipe.ingredients){
                    if (this.Typo(ingredient.ingredient).includes(this.Typo(this.tagArray[0]))){
                        this.allRecipeFiltered.push(recipe);
                        }
                    }
                }
        }

        else if (document.getElementsByClassName("tag")[0].className=="tag green"){
            for (let recipe of this.allRecipe){
                if (this.Typo(recipe.appliance).includes(this.Typo(this.tagArray[0]))){
                    this.allRecipeFiltered.push(recipe);
                }
            }

        }
        else if (document.getElementsByClassName("tag")[0].className=="tag red"){
            for( let recipe of this.allRecipe ){
                for (let ustensil of recipe.ustensils){
                    if (this.Typo(ustensil).includes(this.Typo(this.tagArray[0]))){
                        this.allRecipeFiltered.push(recipe);
                        }
                    }
                }
        }
    
        for(let i=1; i<this.tagArray.length; i++){

            if(document.getElementsByClassName("tag")[i].className==="tag blue"){ 
                this.FilterAlgoIngredient(this.tagArray[i])}
            else if(document.getElementsByClassName("tag")[i].className==="tag green"){
                this.FilterAlgoAppliance(this.tagArray[i])}
            else if(document.getElementsByClassName("tag")[i].className==="tag red"){
                this.FilterAlgoUstensils(this.tagArray[i])}
        }
        this.FilterInterface()
    }

    tagRemove(){//remove the tag when the close button is clicked
        let tagClass= document.getElementsByClassName("tag");
        for (let i=0; i<tagClass.length; i++){
            tagClass[i].firstElementChild.addEventListener("click",(e)=>{
                let index= this.tagArray.indexOf(this.Typo(e.target.parentElement.textContent))
                this.tagArray.splice(index,1)
                e.target.parentElement.remove()
                this.reinitRecipe()
                this.textContentIngredient();
                this.textContentAppliance();
                this.textContentUstensil();             
            })     
        } 
    }

    FilterAlgoIngredient(e){//filter the recipes with the ingredient tags

        if (this.tagArray.length>1 || document.getElementsByTagName("input")[0].value.length>2) {
            
            for(let recipe of this.allRecipeFiltered){
                for (let ingredient of recipe.ingredients){
                    if(this.Typo(ingredient.ingredient).includes(this.Typo(e))){
                       this.allRecipeFilteredProvisional.push(recipe)                
                    }
                }
            }
            this.allRecipeFiltered=[];
            this.allRecipeFiltered=this.allRecipeFilteredProvisional
            this.allRecipeFilteredProvisional=[]

        }else{

            for( let recipe of this.allRecipe ){
                for (let ingredient of recipe.ingredients){
                    if (this.Typo(ingredient.ingredient).includes(this.Typo(e))){  
                        this.allRecipeFiltered.push(recipe);
                       
                        }
                    }
                }
            }
    }

    FilterAlgoAppliance(e){//filter the recipes with the appliance tags
    
        if (this.tagArray.length>1 || document.getElementsByTagName("input")[0].value.length>2) {
            this.allRecipeFilteredProvisional=this.allRecipeFiltered.filter(el =>this.Typo(el.appliance).includes(this.Typo(e)))
             this.allRecipeFiltered=[];
             this.allRecipeFiltered=this.allRecipeFilteredProvisional
             this.allRecipeFilteredProvisional=[]
         }
        else{
            this.allRecipeFiltered=this.allRecipe.filter(el =>this.Typo(el.appliance).includes(this.Typo(e)))
      
            }
 
    }
     FilterAlgoUstensils(e){//filter the recipes with the ustensils tags
    
        if (this.tagArray.length>1 || document.getElementsByTagName("input")[0].value.length>2) {

            for(let recipe of this.allRecipeFiltered){
                for (let ustensil of recipe.ustensils){
                    if(this.Typo(ustensil).includes(this.Typo(e))){
                        this.allRecipeFilteredProvisional.push(recipe)    
                    }
                }
            }
            this.allRecipeFiltered=[];
            this.allRecipeFiltered=this.allRecipeFilteredProvisional
            this.allRecipeFilteredProvisional=[]
       
        }else{
          
            for( let recipe of this.allRecipe ){
                for (let ustensil of recipe.ustensils){
                    if (this.Typo(ustensil).includes(this.Typo(e))){  
                         this.allRecipeFiltered.push(recipe);
                        }
                    }
                }
            }
    }
}