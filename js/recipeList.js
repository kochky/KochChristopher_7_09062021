class RecipeList {
    constructor(){
    this.allRecipe=[]
    }


    init(recipe) //Start when photograph.html is open
    {  
        this.allRecipe.push(recipe)
       
       
    }
    flexLastRecipe(){//the last card will go to the left

        document.getElementById(this.allRecipe[this.allRecipe.length-1].id).style.flexGrow="1"
    }

    // buttonStyle(){
    //     var button= document.getElementsByClassName("btn");
    //     for (var i=0; i< button.length; i++){
    //         button[i].addEventListener("click",(e,)=>{
    //             for (var i=0; i< button.length; i++){
    //             button[i].style.width="170px";
    //             button[i].style.height="71px"}
    //             e.target.parentNode.style.width= "667px"
    //             e.target.parentNode.style.height="397px"
    //         })
    //     } 
    //}
    FilterListener(){
        var input= document.getElementsByTagName("input")
        for (var i=0; i< input.length; i++){
        input[i].addEventListener("input",(e)=>{
            if (e.target.value.length >= 3){
           this.FilterAlgo(e.target.value)}
        })
        }
    }
    















}