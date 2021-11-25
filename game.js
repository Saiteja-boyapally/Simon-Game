// alert("hello");
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;
var started = false;

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
}
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").on('click',function() {
  var userChosenColour = $(this).attr("id")
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});
// console.log(gamePattern[0]);


function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor((Math.random()*4));
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
}, 100);
}


function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // console.log("success");
    if (userClickedPattern.length === gamePattern.length)
    {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    playSound("wrong");
    // console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document.body).addClass("game-over");
    setTimeout(function() {
    $(document.body).removeClass("game-over");;
     }, 300);
   startOver()

  }

}
