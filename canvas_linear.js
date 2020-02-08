//------------------This code for Linear Canvas, to make Linear Bezier Curve
var pointsLinear = [{x: 20, y: 250}, {x: 20, y: 30}], //Initial position for control points in Linear Canvas
    bezierLinearComplete = {},//array to save linear value for complete functionality
    bezierLinearInprogress = {},//array to save linear value for inprogress functionality
    lineLinear = d3.svg.line().x(x_Linear).y(y_Linear), //function from d3.js to create line, the value depends on x_Linear and Y_Linear
    n = 4,
    ordersLinear = d3.range(5, n + 2);

var visLinear;//Variable to hold the value of bezier Linear create by d3.js
var dotLinearPoints = {}; //array to save dot linear value for inprogress functionality
var dotLinearPointsComplete = {}; //array to save dot linear value for complete functionality


var startTheLinear = d3.select("#canvasLinear").selectAll("svg") //create the svg canvas and positioning the canvas
        .data(ordersLinear)
        .enter()
        .append("svg:svg")
        .attr("width", w + 2 * padding)
        .attr("height",topBorder + h + 2 * padding)
        .attr("transform", "translate(" + padding + "," + topBorder + ")");

    startTheLinear.append("rect")//Create the canvas background color and make border of the canvas
        .attr("width", w + 2 * padding)
        .attr("height",  h + 2 * padding)
        .attr("fill", "#b0aa99")//Color for canvas background
        .attr("stroke", "black")
        .attr("stroke-width", 2);

startLinear();//start create the control points for linear curve

//-------------------function to create control points, drag and drop functionality, for linear curves--------------
function startLinear () {
  visLinear = startTheLinear.append("svg:g")
              .attr("id","reset")
              .attr("transform", "translate(" + padding + "," + padding + ")");

  updateLinear(getCurveLinear, dotLinearPoints);//start create the bezier curves and dots

  visLinear.selectAll("circle.control_Linear")//create the control points, set control points first position
      .data(function(d) {return pointsLinear.slice(0, d) })
      .enter().append("svg:circle")
      .attr("class", "control_Linear")
      .attr("r", 6)
      .attr("cx", x_Linear)
      .attr("cy", y_Linear)
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          this.__origin__ = [d.x, d.y];
        })
        .on("drag", function(d) {//update the position of control points when drag and drop happens
          d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
          d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
          bezierLinearComplete = {};
          bezierLinearInprogress = {};

          if (document.getElementById("complete").checked) {
            updateLinear(getCurveLinearComplete, dotLinearPointsComplete);//update the curve and dots, when user drags the control points for complete function
          }else{
            updateLinear(getCurveLinear, dotLinearPoints);//update the curve and dots, when user drags the control points for inprogress function
          }

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

}

//Funtion to update the curve and dots, when user move the control points, slider, and change functionality
function updateLinear(getCurveLinearData, getDotLinearData) {
  var interpolationLinear = visLinear.selectAll("g")
      .data(function(d) {return getLevelsForlineLinear(d, t); });
  interpolationLinear.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  //Create Line between control points
  var pathLinear = interpolationLinear.selectAll("path")
      .data(function(d) {return [d];});
  pathLinear.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineLinear);
  pathLinear.attr("d", lineLinear);

  //Create bezier curve
  var curveLinear = visLinear.selectAll("path.curve1")
      .data(getCurveLinearData);
  curveLinear.enter().append("svg:path")
      .attr("class", "curve1");
  curveLinear.attr("d", lineLinear);

  //Create bezier dots
  $(".dotLinear").remove()
  var dotLinear = visLinear.selectAll("circle.dotLinear")
      .data(getDotLinearData)
      .enter().append("circle")
      .attr("class", "dotLinear")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

}

//function to interpolate each bezier curve and bezier points
function interpolateLinear(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

//function to calculate the position of control points and send it to the interpolate to get each bezier value
function getLevelsLinear(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsLinear.slice(0, d)];
  for (var i=1; i<2; i++) {
    x.push(interpolateLinear(x[x.length-1], t_));
  }
  return x;
}

////function to calculate the position of control points, and create line that connected control points
function getLevelsForlineLinear(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsLinear.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateLinear(x[x.length-1], t_));
  }
  return x;
}

//Store all bezier points and dots to create the curve for inprogress functions
function getCurveLinear(d) {
  var curve = bezierLinearInprogress[d];
  if (!curve) {
    curve = bezierLinearInprogress[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsLinear(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotLinearPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

//Store all bezier points and dots to create the curve for complete functions
function getCurveLinearComplete(d) {
  var curve = bezierLinearComplete[d];
  if (document.getElementById("complete").checked) {
    curve = bezierLinearComplete[d] = [];
    for (var t_=0; t_<=(delta*100); t_+=1) {
      var x = getLevelsLinear(d, t_/(delta*100));
      curve.push(x[x.length-1][0]);
    }
  }
  dotLinearPointsComplete = curve;
  return [curve];
}

function x_Linear(d) { return d.x; } //get x value from the array
function y_Linear(d) { return d.y; } //get y value from the array
function colour(d, i) {
  return d.length > 1 ? ["#000", "yellow", "blue", "green"][i] : "red"; //#000 black color for line between control points, red color for curve
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasLinear").addEventListener('touchmove', static, false);
