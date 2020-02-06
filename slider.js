var slider = document.getElementById("myRange");

$(document).ready(function(){
  $('input[type=radio]').click(function(){
    if (this.id == "complete"){

        delta = 0.11 - (slider.value/10);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
        document.getElementById("inprogress").checked = false;

        slider.oninput = function() {
          delta = 0.11 - (this.value/10);
          updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
          updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);
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
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          updateQuadratic(getCurveQuadratic, dotQuadraticPoints);
          document.getElementById("complete").checked = false;

          slider.oninput = function() {
            t = this.value;
            updateLinear(getCurveLinear, dotLinearPoints);
            updateQuadratic(getCurveQuadratic, dotQuadraticPoints);

          }
        }
    });
});

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
