//-------------This script use for controlling all radio button and slider, consist with function to call and update other function in canvas-----------

var slider = document.getElementById("myRange"); //initialize slider element

//-------------------------------When radio button for complete function clicked, go to this function
$(document).ready(function(){
  $('input[type=radio]').click(function(){
    if (this.id == "complete"){

        delta = slider.value;//set value for number of dot control by slider
        //call update function for all canvas for complete function
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);

        document.getElementById("inprogress").checked = false;//if complete radio button clicked then unclicked inprogress radio button
      }
  });
});

//----------------------------When radio button for inprogress function clicked, go to this function
$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "inprogress"){
          //when create the curve inprogress, to minimize the calculation than calculation of number of dots only be done once every cycle
          //to empty the array need to be done manually, by gave empty array to this variable
          bezierLinearInprogress = {};
          bezierQuadraticInprogress = {};
          bezierCubicInprogress = {};
          bezierQuarticInprogress = {};

          delta = 0.01;
          t = slider.value;//number of dots control by time
          //call update function for all canvas for inprogress function
          updateLinear(getCurveLinear, dotLinearPoints);
          updateLinear(getCurveLinear, dotLinearPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);

          document.getElementById("complete").checked = false;//if inprogress radio button clicked then unclicked complete radio button
        }
    });
});

//--------------------------------Function to reset all canvas, and put into first position
function resetFunction() {
  //remove all existing canvas or clean the canvas
  $("#reset").remove();
  $("#reset").remove();
  $("#reset").remove();
  $("#reset").remove();

  //when create the curve inprogress, to minimize the calculation than calculation of number of dots only be done once every cycle
  //to empty the array need to be done manually, by gave empty array to this variable
  bezierLinearInprogress = {};
  bezierQuadraticInprogress = {};
  bezierCubicInprogress = {};
  bezierQuarticInprogress = {};

  //First point when start all canvas
  pointsLinear = [{x: 20, y: 250}, {x: 20, y: 30}];
  pointsQuadratic = [{x: 20,y: 250}, {x: 20,y: 30}, {x: 100,y: 20}];
  pointsCubic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150}];
  pointsQuartic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150},{x:175,y:230}];

  //call function to create all first dots and line, and put it on first position
  startLinear();
  startQuadratic();
  startCubic();
  startQuartic();


  if (document.getElementById("complete").checked) {//Check if radiobutton complete clicked
    //call update function to all canvas to update the position based on value on slider
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
  }else if(document.getElementById("inprogress").checked){//Check if radiobutton inprogress clicked
    //call update function to all canvas to update the position based on value on slider
    updateLinear(getCurveLinear, dotLinearPoints);
    updateLinear(getCurveLinear, dotLinearPoints);
    updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
    updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
    updateCubic(getCurveCubic, dotCubicPoints);
    updateCubic(getCurveCubic, dotCubicPoints);
    updateQuartic(getCurveQuartic, dotQuarticPoints);
    updateQuartic(getCurveQuartic, dotQuarticPoints);
  }
}

//-----------------------Go to this function, if slider value change or user drag and drop the slider value
slider.oninput = function() {
  if(document.getElementById("inprogress").checked){
    t = this.value;
    //When slider value change, update the curve and dot for all canvas for inprogress function
    updateLinear(getCurveLinear, dotLinearPoints);
    updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
    updateCubic(getCurveCubic, dotCubicPoints);
    updateQuartic(getCurveQuartic, dotQuarticPoints);

  }else if (document.getElementById("complete").checked) {
    delta = this.value;
    //When slider value change, update the curve and dot for all canvas for inprogress function
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
  }
}
