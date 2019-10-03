var gal = document.querySelector("#gallery");
var delays = [1,2,3,4,5,6];
delays.forEach(function(delay){
 var newBox= document.createElement("div");
  newBox.classList.add("boxed");
  //set the delay
  newBox.style.animationDelay = delay+"s";
  //put into thy gallery
  gal.appendChild(newBox)
})
