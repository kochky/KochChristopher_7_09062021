class Recipe {
    constructor(data){
       
        this.id= data.id;
        this.name= data.name;
        this.servings= data.servings;
        this.ingredients= data.ingredients;
        this.time= data.time;
        this.description= data.description;
        this.appliance= data.appliance;
        this.ustensils= data.ustensils;

    }
    init(){
        this.createCard();
        this.createIngredient()
    }

    renderCard(){//HTML pattern of the cards  
        return `
            <div id=${this.id} class="card col-4">
                <img class="card-img-op bg-dark" src="" alt="" height="178">
                <div class="card-body bg-light">
                    <div class=row>
                        <h5 class="card-title col-8">${this.name}</h5>
                        <p class="card-title col-4 font-weight-bold "><i class="far fa-clock fa-lg"></i> ${this.time}min</p>
                    </div>
                    <div class=row>
                        <div id=ingredients-${this.id} class="card-text line-height col-6">
                        </div>
                        <p class="col-6 card-text roboto">
                            ${this.description}
                        </p>
                    </div>
                </div>         
            </div> `
    }

    createCard(){ //Put the "renderCard" in the div "Grid"
        var cardDeck= document.getElementById("card-deck")
        cardDeck.innerHTML += this.renderCard()
    }

    renderRecipe( ingredients){
        if((ingredients.quantity) ==undefined){
            return  `<p ><b> ${ingredients.ingredient}</b></p>`  
        }
       else if ((ingredients.unit) !=undefined){
            return  `<p ><b> ${ingredients.ingredient}:</b> ${ingredients.quantity} ${ingredients.unit}</p>`
        }else {
            return  `<p ><b> ${ingredients.ingredient}:</b> ${ingredients.quantity}</p>` 
        }
    }

    createIngredient(){
        for (let ingredient of this.ingredients){
        document.getElementById("ingredients-"+this.id).innerHTML += this.renderRecipe(ingredient);
        }
    }
}