var slider = document.getElementById("myRange");

$(document).ready(function(){
  $('input[type=radio]').click(function(){
    if (this.id == "complete"){

        delta = 0.11 - (slider.value/10);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        document.getElementById("inprogress").checked = false;

        slider.oninput = function() {
          delta = 0.11 - (this.value/10);
          updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
          updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
          updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
          updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);
        }
      }
  });
});

$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "inprogress"){

          delta = 0.01;
          t = slider.value;

          updateLinear(getCurveLinear, dotLinearPoints);
          updateLinear(getCurveLinear, dotLinearPoints);
          updateLinear(getCurveLinear, dotLinearPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateCubic(getCurveCubic, dotCubicPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);
          updateQuartic(getCurveQuartic, dotQuarticPoints);

          document.getElementById("complete").checked = false;

          slider.oninput = function() {
            t = this.value;

            updateLinear(getCurveLinear, dotLinearPoints);
            updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
            updateCubic(getCurveCubic, dotCubicPoints);
            updateQuartic(getCurveQuartic, dotQuarticPoints);
          }
        }
    });
});

function resetFunction() {
  $("#reset").remove();
  $("#reset").remove();
  $("#reset").remove();
  bezierLinearInprogress = {};
  bezierQuadraticInprogress = {};
  bezierCubicInprogress = {};

  pointsLinear = [{x: 20, y: 250}, {x: 20, y: 30}];
  pointsQuadratic = [{x: 20,y: 250}, {x: 20,y: 30}, {x: 100,y: 20}];
  pointsCubic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150}];

  startLinear();
  startQuadratic();
  startCubic();

  if (document.getElementById("complete").checked) {
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
    updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
  }else if(document.getElementById("inprogress").checked){
    updateLinear(getCurveLinear, dotLinearPoints);
    updateLinear(getCurveLinear, dotLinearPoints);
    updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
    updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
    updateCubic(getCurveCubic, dotCubicPoints);
    updateCubic(getCurveCubic, dotCubicPoints);
  }
}

/*var slider = document.getElementById("myRange");
updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
updateQuadratic();
updateCubic();
updateQuartic();
$(".curve1").remove()

$(document).ready(function(){
    $('input[type=radio]').click(function(){
      updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
      updateQuadratic();
      updateCubic();
      updateQuartic();
        if (this.id == "complete"){

            document.getElementById("inprogress").checked = false;
            t = 1;
            document.querySelector('input[type=range]').value = 1;

            updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
            updateQuadratic();
            updateCubic();
            updateQuartic();

            slider.oninput = function() {
              t = 1;
              delta = 0.11-(this.value/10);

              updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
              updateQuadratic();
              updateCubic();
              updateQuartic();
            }
        }
        dotLinearPointsComplete = {};
        dotLinearPoints = {};
    });
});


$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "inprogress"){

          delta = 0.01;
          t = 0;
          document.querySelector('input[type=range]').value = 0;
          document.getElementById("complete").checked = false;
          updateLinear(getCurveLinear, dotLinearPoints);
          updateQuadratic();
          updateCubic();
          updateQuartic();
          dotLinearPoints = {};
            slider.oninput = function() {
              t = this.value;

              updateLinear(getCurveLinearInprogress, dotLinearPoints);
              updateQuadratic();
              updateCubic();
              updateQuartic();

            }
        }
        dotLinearPointsComplete = {};
        dotLinearPoints = {};
    });
});
*/
