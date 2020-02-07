var slider = document.getElementById("myRange");

$(document).ready(function(){
  $('input[type=radio]').click(function(){
    if (this.id == "complete"){

        //delta = 0.11 - (slider.value/10);
        delta = slider.value;
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);

        document.getElementById("inprogress").checked = false;
      }
  });
});

$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "inprogress"){
          bezierLinearInprogress = {};
          bezierQuadraticInprogress = {};
          bezierCubicInprogress = {};
          bezierQuarticInprogress = {};

          delta = 0.01;
          t = slider.value;

          updateLinear(getCurveLinear, dotLinearPoints);
          updateLinear(getCurveLinear, dotLinearPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);

          document.getElementById("complete").checked = false;
        }
    });
});

function resetFunction() {
  $("#reset").remove();
  $("#reset").remove();
  $("#reset").remove();
  $("#reset").remove();

  bezierLinearInprogress = {};
  bezierQuadraticInprogress = {};
  bezierCubicInprogress = {};
  bezierQuarticInprogress = {};

  pointsLinear = [{x: 20, y: 250}, {x: 20, y: 30}];
  pointsQuadratic = [{x: 20,y: 250}, {x: 20,y: 30}, {x: 100,y: 20}];
  pointsCubic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150}];
  pointsQuartic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150},{x:175,y:230}];

  startLinear();
  startQuadratic();
  startCubic();
  startQuartic();

  if (document.getElementById("complete").checked) {
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
    updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
  }else if(document.getElementById("inprogress").checked){
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

slider.oninput = function() {
  if(document.getElementById("inprogress").checked){
  t = this.value;
  updateLinear(getCurveLinear, dotLinearPoints);
  updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
  updateCubic(getCurveCubic, dotCubicPoints);
  updateQuartic(getCurveQuartic, dotQuarticPoints);

}else if (document.getElementById("complete").checked) {
  delta = this.value;
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
