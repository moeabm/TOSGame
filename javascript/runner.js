var stateStopped = 0;
var stateRunning = 1;
var stateFalling = 2;
var statePickedUp = 3;
var stateDead = 4;

var groundLevel = 295;
var animName = "";

var vVel = 0 ;
var gravity = 3; // 9.81 is too extreme
var gravityOn = true;
var rot = 0;

runnerFrame = 0;
maxFrames = 9;

$('img').on('dragstart', function(event) { event.preventDefault(); });

function setRunnerState( state ){
    runnerState = state;
}

function runnerStep(){
    var nextFrame = ""
    if(paused) return false;
    leftPos = parseInt($("#runner").css("left"));
    botPos = parseInt($("#runner").css("bottom"));
    
    if(leftPos > 450){
        //initial jump
        if(runnerState == stateRunning){
          vVel = 30;
        }
        if(runnerState != stateDead){
            runnerState = stateFalling;
        }
    }
    
    if(runnerState == stateRunning){
        $("#runner").css({
            left: "+="+gameDifficultyFactor,
            // bottom: groundLevel+"px"
        })
        animName = "run";
    }
    else if(runnerState == stateFalling){
        $("#gametext").hide(500);
        if(botPos > 0) {
            $("#runner").css({
                transform: "rotate("+(rot+=4)+"deg)",
                left: "+="+8,
                bottom: "+="+(vVel-=gravity)
            })
            animName = "run";
        }
        else{
            runnerState = stateDead
            animName = "dead";
            setTimeout( function(){ talk("PICK ME UP!!!!")}, 500);
            setTimeout( function(){ if(runnerState == stateDead) talk("PICK ME UP!!!!")}, 5000);
            paused = true;
        }
    }
    //Grvity handling
    if(gravityOn)
        if(leftPos < 450)
        if(botPos < groundLevel  ){
            
            if(botPos < groundLevel - 50  ){
                $("#runner").css({
                    bottom: groundLevel+"px"
                });
            }
            vVel = 0;
        }
        else {
             $("#runner").css({
                  bottom: "+="+(vVel-=gravity)
            });
        }
    console.log(animName);
    $("#runner img").attr('src', "images/stickman/"+animName+ (runnerFrame = (runnerFrame + 1 ) % maxFrames) +".png");
}

$("#runner").mousedown(function() {
    if(runnerState == stateFalling){
        console.log("falling no grabbing")
        return false;
    }
    animName="hang";
    runnerState = statePickedUp;
    $("#dialog").hide();
    gravityOn = false;
    vVel = 0;
    rot = 0;
    
    $("#gametext").show(500);
});


$("#gamearea").mouseup(function() {
    runnerState = stateRunning;
    gravityOn = true;
    if(clock > 0 ) paused = false;
    $("#playertext textarea").focus();
    //alert("playerloaded");
});

$( "#gamearea" ).mousemove(function( e ) {
    if(runnerState == statePickedUp){
        var offset = $(this).offset();
        var width = $('#runner').width();
        $('#runner').css({
            transform: "rotate("+(rot)+"deg)",
            left:  e.pageX - offset.left - width / 2,
            bottom:   600 - e.pageY - offset.top + 80
        });
    }
});

function talk(text, timeout){
    
   timeout = typeof timeout !== 'undefined' ? timeout : 3000;
    $("#dialog").text(text);
    $("#dialog").show(100);
    setTimeout(function() {  $("#dialog").hide(100) }, timeout);
    
}
// alert("playerloaded");
