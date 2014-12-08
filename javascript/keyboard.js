
function include(file){
    var js = document.createElement("script");
    
    js.type = "text/javascript";
    js.src = file;
    
    document.body.appendChild(js);
}

var totalChars = 0;
var progress = 0;
var skippedChars= 0;
var workQueue = "";

var ctrlDown = false;

var runnerState = 0;
var clock = 0.0;
var totalShifted = 0;
var paused = true;

//Game Settings
var gameThinkTimer = 98; // milliseconds
var gameDifficultyFactor = 3 * gameThinkTimer / 100; // 3 is good for me
var gameShiftFactor = "8.43";  // this number keeps the cursor in te middle of the screen.
var gameSkippPentalty = 9;


// onload actions and handlers
$(document).ready(function () {
    include("javascript/runner.js");
    getURLTOS();
    
    playIntro();
        thinkTask();
    setTimeout(function(){ 
        startGame();
    }, 17000)
    
    
    //setTimeout(startGame, 500);
    var attempt = 0;
    $('textarea').bind('input propertychange',function (e) {
        paused = false;
        str = $(this).val();
        lastChar = str.substring(str.length-1);
        nextWorkChar = workQueue.substring(0,1);
        if(lastChar == nextWorkChar){
        // typed the correct character
            workQueue = workQueue.substring(1,workQueue.length);
            // $("#previewarea").text(workQueue);
            attempt = 0;
        }
        else {
        // typed the wrong character
            if(attempt >= 2){
            //skip after 3 failed attempts
                workQueue = workQueue.substring(1,workQueue.length);
                $('textarea').val($('textarea').val().substring(0,$('textarea').val().length - 1 )+"#");
                $("#myarea").text(workQueue);
                attempt = 0;
                
                for( i = 0 ; i < gameSkippPentalty ; i++) runnerStep();
                skippedChars++;
            }
            else {
                $('textarea').val($('textarea').val().substring(0,$('textarea').val().length - 1 ));
                attempt++;
                return;
            }
            
        }
        shiftLeft(gameShiftFactor);
    });
    
    $(document).keydown(function(e) {
        
        if (e.keyCode === 17) {
            ctrlDown = true;
        }
        //CTRL + R
        if (ctrlDown && e.keyCode === 82) {
            resetGame();
            return false;
        }
        if( runnerState == stateFalling || runnerState == stateDead ){
            return false;
        }
        if (e.keyCode === 8) {
            return false;
        }
        if (e.keyCode === 9) {
            return false;
        }
        
    });
    
    $(document).keyup(function(e) {
        if (e.keyCode === 17) {
            ctrlDown = false;
        }
    });
    
});

function thinkTask(){
    //console.log(vVel + " vel")
    if(paused){
    
    }
    else{
        if(progress >= 100 && paused == false){
            paused = true;
            launchEndGame();
        }
        clock += gameThinkTimer / 1000;
        runnerStep();
        // console.log("running : " + clock);
    }
    
    updateClock();
    updateSkipped();
    updateProgress();
    setTimeout(function(){
            thinkTask();
    }, gameThinkTimer);
}

function setGameText(txt){
     
     //Sanatize
     txt = txt.replace(/\r?\n/g, ' '); // get rid of new lines
     txt = txt.replace(/^\s+/g, ''); // get rid of leading spacess
     txt = txt.replace(/\s\s/g, ' '); // get rid of double spacess
     
     $("#gametext").text(txt)
     $("#gametext").show()
     $("#previewarea").text(txt)
     
     totalChars = txt.length;
     workQueue = txt;
}

function startGame(){
    if(clock > 0 ) return false; // game already started
    paused = false;
    runnerState = 1;
     $("#curtain").slideUp(1000);
     $(".NarativeText").hide(500);
     $("#skip").fadeOut(500);
    $("#playertext textarea").focus();
    return false;
}

function resetGame(){
    paused = true;
    clock = 0;
    progress = 0;
    skippedChars= 0;
    shiftRight(totalShifted);

    $("#runner").css({
	left: "0px",
 	transform: "rotate(0deg)"
	});
    getURLTOS();
    $("#playertext textarea").val('');
    setTimeout(startGame, 1000);
    return false;
}

function playIntro(){
    
    setTimeout(function(){
        $("#skip").fadeIn("500");
    }, 2500); 
    setTimeout(function(){
        if(progress < 100)
        scrollText("Don't want to read 'Terms of service'?!");
    }, 2000); 
    setTimeout(function(){
        if(progress < 100)
        scrollText("Want to sharpen those typing skills?!");
    }, 6000);
    setTimeout(function(){
        if(progress < 100)
        scrollText("Do you feel like saving a stickman from certain death?!");
    }, 10000); 
    setTimeout(function(){
        if(progress < 100)
        scrollText("Let's get started!");
    }, 14000);
}

function launchEndGame(){
     $("#curtain").slideDown(1000);
     
    setTimeout(function(){
        scrollText("Congradulations!")
    }, 2000);
    
    setTimeout(function(){
        scrollText("...you are now an expert on our Terms of Service! right?");
    }, 6000);
}

function updateClock(){
    $("#clock").text(clock.toFixed(2));
}

function updateProgress(){
    progress = $("#playertext textarea").val().length / totalChars * 100;
    //console.log(progress);
    $("#progress").css({
        width: ""+ progress +"%"
        });
}

function updateSkipped(){
    $("#skipped-chars #value").text(skippedChars);
}

//Viewport modifiers
function shiftLeft(numStr){
    $(".ground").css({
        left: "-="+numStr
    });
    
    if(parseFloat($("#spikes").css("left")) < -1020)
       $("#spikes").css({left: "1020px"});
    totalShifted += parseFloat(numStr);
}
function shiftRight(numStr){
    console.log(totalShifted + " shifted");
    $(".ground").css({
        left: "+="+numStr
    });
    totalShifted -= parseFloat(numStr);
}

function scrollText( text ){
    if(clock > 0 && progress < 100) return false; // game already started
    var slideTime = 500
    var readTime = 3000
    $("#gamearea").append("<div class='NarativeText'>"+text+"</div>");
    $(".NarativeText").animate({left: "-=1020" }, slideTime, function(){
        setTimeout( function(){
            $(".NarativeText").animate({left: "-=1020" }, slideTime,function(){ $(this).remove(); });
        }, readTime);
    });
}
