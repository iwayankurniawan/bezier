var slider = document.getElementById("myRange");

slider.oninput = function() {
  t = this.value;
  updateLinear();
  updateQuadratic();
  updateCubic();
  updateQuartic();

/*
      var dotlinear =  visQuartic.selectAll('circle.dot').append("circle")
          .data(getCurveLinear).enter()
          .attr("class", "dot")
          .attr("cx", function(d,i) {console.log(i); return d[i].x; })
          .attr("cy", function(d,i) { return d[i].y; });

          var dotlinear = visQuadratic.selectAll("path.curve1")
              .data(getCurveQuadratic);
          curveQuadratic.enter().append("svg:path")
              .attr("class", "curve1");
          curveQuadratic.attr("d", lineQuadratic);*/

}
