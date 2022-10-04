// Button Press

var n = document.querySelectorAll(".drum").length;

//This for loop will add event listner to all elements
for(var i = 0; i < n; i++)
{
  //After event listner is added to all elements, then the eventListner gets activated by click, and then "this" finds out which button activated the eventListner or function inside eventListner
  //sound stores the value of this.innerHTML and sends it to makesound function.
 document.querySelectorAll(".drum")[i].addEventListener("click",function()
{
    var sound = this.innerHTML;

    makeSound(sound);

    buttonAnimation(sound);
});
}

// Keyboard press

document.addEventListener("keypress", function(even)
{
  makeSound(even.key);

  buttonAnimation(even.key);
});


function makeSound(key)
{

   switch(key)
   {
     case "w":
          var tom1 = new Audio("sounds/tom-1.mp3");
          tom1.play();
          break;

     case "a":
          var tom2 = new Audio("sounds/tom-2.mp3");
          tom2.play();
          break;

     case "s":
          var tom3 = new Audio("sounds/tom-3.mp3");
          tom3.play();
          break;

     case "d":
          var tom4 = new Audio("sounds/tom-4.mp3");
          tom4.play();
          break;

     case "j":
          var snare = new Audio("sounds/snare.mp3");
          snare.play();
          break;

     case "k":
          var crash = new Audio("sounds/crash.mp3");
          crash.play();
          break;

     case "i":
           var kickBass = new Audio("sounds/kick-bass.mp3");
           kickBass.play();
           break;

     default:alert("somthing wrong");

    }
}

function buttonAnimation(currentKey)
{
  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

setTimeout(
function()
{
  activeButton.classList.remove("pressed");
},100);
}
