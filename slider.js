var slider = document.getElementById("myRange");

$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "complete"){
            document.getElementById("inprogress").checked = false;
            t = 1;
            
            updateLinear(getCurveLinear, dotLinearPoints);
            updateQuadratic();
            updateCubic();
            updateQuartic();

            /*
            dotLinearPoints = {};
            dotQuadraticPoints = {};
            dotCubicPoints = {};
            dotQuarticPoints = {};
            */

            slider.oninput = function() {
              t = 1;
              delta = 0.11-(this.value/10);

              updateLinear(getCurveLinearComplete, dotLinearPointsComplete);
              updateQuadratic();
              updateCubic();
              updateQuartic();
            }
        }
    });
});


$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "inprogress"){
            document.getElementById("complete").checked = false;
            slider.oninput = function() {
              t = this.value;
              updateLinear(getCurveLinear, dotLinearPoints);
              updateQuadratic();
              updateCubic();
              updateQuartic();
            }
        }
    });
});
