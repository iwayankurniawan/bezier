var slider = document.getElementById("myRange");

$(document).ready(function(){
    $('input[type=radio]').click(function(){
        if (this.id == "complete"){
            document.getElementById("inprogress").checked = false;
            t = 1;
            updateLinear();
            updateQuadratic();
            updateCubic();
            updateQuartic();
            slider.oninput = function() {
              t = 1;
              delta = this.value;
              console.log(delta);
              dotLinearPoints = {};
              dotQuadraticPoints = {};
              dotCubicPoints = {};
              dotQuarticPoints = {};

              updateLinear();
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
              dotLinearPoints = {};
              dotQuadraticPoints = {};
              dotCubicPoints = {};
              dotQuarticPoints = {};

              updateLinear();
              updateQuadratic();
              updateCubic();
              updateQuartic();
            }
        }
    });
});
