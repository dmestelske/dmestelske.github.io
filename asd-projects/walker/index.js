/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;


  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);     
  // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);     


  var KEY = {
    "LEFT": 37,
    "UP":38,
    "RIGHT": 39,
    "DOWN": 40
  };
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
   if (event.which === KEY.LEFT) {
    walker.speedX = -5;
   }
   else if (event.which === KEY.RIGHT) {
    walker.speedX = 5;
   }
   else if (event.which === KEY.DOWN) {
    walker.speedY = 5;
   }
   else if (event.which === KEY.UP) {
    walker.speedY = -5;
   }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
     walker.speedX = 0;
    }
    else if (event.which === KEY.RIGHT) {
     walker.speedX = 0;
    }
    else if (event.which === KEY.DOWN) {
     walker.speedY = 0;
    }
    else if (event.which === KEY.UP) {
     walker.speedY = 0;
    }
   }

var walker = {
  positionX: 0,
  positionY: 0,
  speedX: 0,
  speedY: 0 
};


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
   walker.positionX += walker.speedX;
 
   walker.positionY += walker.speedY;
  };

  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
  }
  
  function wallCollision() {
    if (walker.positionX > ($("#board").width())) {
      walker.positionX -= walker.speedX;
    }

    else if (walker.positionX < 0) {
      walker.positionX -= walker.speedX;

    } 
    
    else if (walker.positionY > ($("#board").height())) {
      walker.positionY-= walker.speedY;
    }


    else if (walker.positionY < 0) {
      walker.positionY -= walker.speedY;
    }
  }
    

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
