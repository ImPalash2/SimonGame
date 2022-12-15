
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//make sounds
function playSound(name)
{
    var sound = new Audio(name);
    sound.play();
}

//for animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//detect the first key press
var level = 0;
var started = false;
$(".start-btn").on("click", function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //for animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //for sound
    var soundTrack = "sounds/" + randomChosenColor + ".mp3";
    playSound(soundTrack);
    
}

//for trace the user chosed color button
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    //palying the sound
    var soundTrack = "sounds/" + userChosenColor + ".mp3";
    playSound(soundTrack);
    //for animation
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        var wr = new Audio('sounds/wrong.mp3');
        wr.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Restart");
        startOver();
    }
}

function startOver()
{
    started = false;
    level = 0;
    gamePattern = [];
}