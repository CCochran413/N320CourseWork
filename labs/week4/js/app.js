var theplace= document.querySelector("#theplace");
var cardTemplate = document.querySelector("#cardTemplate");

var suits = [" @","&","!","*"];
var values = ["A","1","2","B"];
var i = 0;

suits.forEach((suit) => {
    values.forEach ((value) =>{
        //we know we have a specific combination of suit + value
        let newCard = document.createElement("div");
        newCard.innerHTML = value + " " + suit;
        newCard.classList.add("card")
        newCard.style.animationDelay = i*.1 + "s";

        newCard.addEventListener("mouseover", onCardOver);

        newCard.addEventListener("mouseout", onCardOut);


        theplace.appendChild(newCard);
        i++;
    })
})

function onCardOver(event) {
    event.target.classList.add("cardOver");
    event.target.classList.remove("cardOut");
    event,target.style.animationDelay = "0s";
  
}

function onCardOut(event) {
    event.target.classList.add("cardOut");
    event.target.classList.remove("cardOver");

  
}