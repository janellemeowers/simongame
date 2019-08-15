var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//starting the game!
$(document).keypress(function(){
  //means if not true
if (!started) {
  //changes to say Level 0
  $("#level-title").text("Level " + level);
  //call next sequence!
  nextSequence();
  started = true;
}
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);
 animatePress(userChosenColour);
 //check each answer after clicking
 checkAnswer(userClickedPattern.length-1);
});




function nextSequence() {
level++;
//update h1 with level
$("#level-title").text("Level " + level);
// reset the array
userClickedPattern = [];

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function checkAnswer (currentLevel) {
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
 console.log("success");
 if (userClickedPattern.length === gamePattern.length) {
   setTimeout(function () {
     nextSequence();

   }, 1000);
 }
} else {
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
}
}



function playSound (name) {
  var audio1 = new Audio ("sounds/"+name+".mp3");
  audio1.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver () {
  level=0;
  gamePattern= [];
  started = false;
}
