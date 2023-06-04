var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(!startGame) {
        $("h1").text("leve " + level);
        nextSequence();
        startGame = true;
    }
})

function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var buttonPressed = $("#" + currentColour)
    buttonPressed.addClass("pressed")
    setTimeout(function(){
        buttonPressed.removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 500)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press any key to restart!");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000)
        startOver();
        }
    }

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
} )

function nextSequence(){
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++
    $("h1").text("Level " + level)
}

