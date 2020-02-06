var pointsLinear = [{x: 20, y: 250}, {x: 20, y: 30}],
    bezierLinear = {},
    lineLinear = d3.svg.line().x(x_Linear).y(y_Linear),
    n = 4,
    ordersLinear = d3.range(5, n + 2);

var dotLinearPoints = {};
var dotLinearPointsComplete = {};

var visLinear = d3.select("#canvasLinear").selectAll("svg")
    .data(ordersLinear)
  .enter().append("svg:svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("svg:g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

visLinear.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "pink");

updateLinear(getCurveLinear, dotLinearPoints);

visLinear.selectAll("circle.control_Linear")
    .data(function(d) {return pointsLinear.slice(0, d) })
  .enter().append("svg:circle")
    .attr("class", "control_Linear")
    .attr("r", 17)
    .attr("cx", x_Linear)
    .attr("cy", y_Linear)
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        this.__origin__ = [d.x, d.y];
      })
      .on("drag", function(d) {
        d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
        d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        bezierLinear = {};
        updateLinear(getCurveLinear, dotLinearPoints);
        visLinear.selectAll("circle.control_Linear")
          .attr("cx", x_Linear)
          .attr("cy", y_Linear);
      })
      .on("dragend", function() {
        delete this.__origin__;
      }));


var last = 0;

//Timer to make it automate
/*d3.timer(function(elapsed) {
  t = (t + (elapsed - last) / 5000) % 1;
  last = elapsed;
  //updateLinear();
});*/

function updateLinear(getCurveLinearData, getDotLinearData) {
  var interpolationLinear = visLinear.selectAll("g")
      .data(function(d) {return getLevelsForlineLinear(d, t); });
  interpolationLinear.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  var pathLinear = interpolationLinear.selectAll("path")
      .data(function(d) {return [d];});
  pathLinear.enter().append("svg:path")
      .attr("class", "lineLinear")
      .attr("d", lineLinear);
  pathLinear.attr("d", lineLinear);

  var curveLinear = visLinear.selectAll("path.curve1")
      .data(getCurveLinearData);//getCurveLinear, dotLinearPoints
  curveLinear.enter().append("svg:path")
      .attr("class", "curve1");
  curveLinear.attr("d", lineLinear);

  $(".dotLinear").remove()
  var dotLinear = visLinear.selectAll("circle.dotLinear")
      .data(getDotLinearData)//dotLinearPoints
      .enter().append("circle")
      .attr("class", "dotLinear")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });
  
}


function interpolateLinear(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

function getLevelsLinear(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsLinear.slice(0, d)];
  for (var i=1; i<2; i++) {
    x.push(interpolateLinear(x[x.length-1], t_));
  }
  return x;
}

function getLevelsForlineLinear(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsLinear.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateLinear(x[x.length-1], t_));
  }
  return x;
}

function getCurveLinear(d) {
  var curve = bezierLinear[d];
  if (!curve) {
    curve = bezierLinear[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsLinear(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotLinearPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

function getCurveLinearComplete(d) {
  var curve = bezierLinear[d];
  if (document.getElementById("complete").checked) {
    curve = bezierLinear[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsLinear(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotLinearPointsComplete = curve;
  return [curve];
}

function x_Linear(d) { return d.x; }
function y_Linear(d) { return d.y; }
function colour(d, i) {
  return d.length > 1 ? ["#ccc", "yellow", "blue", "green"][i] : "red";
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasLinear").addEventListener('touchmove', static, false);
