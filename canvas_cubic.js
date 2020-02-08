//------------------This code for Cubic Canvas, to make Cubic Bezier Curve
var pointsCubic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150}], //Initial position for control points in Cubic Canvas
    bezierCubicComplete = {},//array to save Cubic value for complete functionality
    bezierCubicInprogress = {},//array to save Cubic value for inprogress functionality
    lineCubic = d3.svg.line().x(x_Cubic).y(y_Cubic), //function from d3.js to create line, the value depends on x_Cubic and Y_Cubic
    n = 4,
    ordersCubic = d3.range(5, n + 2);

var visCubic;//Variable to hold the value of bezier Cubic create by d3.js
var dotCubicPoints = {}; //array to save dot Cubic value for inprogress functionality
var dotCubicPointsComplete = {}; //array to save dot Cubic value for complete functionality


var startTheCubic = d3.select("#canvasCubic").selectAll("svg") //create the svg canvas and positioning the canvas
        .data(ordersCubic)
        .enter()
        .append("svg:svg")
        .attr("width", w + 2 * padding)
        .attr("height",topBorder + h + 2 * padding)
        .attr("transform", "translate(" + padding + "," + topBorder + ")");

    startTheCubic.append("rect")//Create the canvas background color and make border of the canvas
        .attr("width", w + 2 * padding)
        .attr("height",  h + 2 * padding)
        .attr("fill", "#ffc7c7")//Color for canvas background
        .attr("stroke", "black")
        .attr("stroke-width", 2);

startCubic();//start create the control points for Cubic curve

//-------------------function to create control points, drag and drop functionality, for Cubic curves--------------
function startCubic () {
  visCubic = startTheCubic.append("svg:g")
              .attr("id","reset")
              .attr("transform", "translate(" + padding + "," + padding + ")");

  updateCubic(getCurveCubic, dotCubicPoints);//start create the bezier curves and dots

  visCubic.selectAll("circle.control_Cubic")//create the control points, set control points first position
      .data(function(d) {return pointsCubic.slice(0, d) })
      .enter().append("svg:circle")
      .attr("class", "control_Cubic")
      .attr("r", 6)
      .attr("cx", x_Cubic)
      .attr("cy", y_Cubic)
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          this.__origin__ = [d.x, d.y];
        })
        .on("drag", function(d) {//update the position of control points when drag and drop happens
          d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
          d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
          bezierCubicComplete = {};
          bezierCubicInprogress = {};

          if (document.getElementById("complete").checked) {
            updateCubic(getCurveCubicComplete, dotCubicPointsComplete);//update the curve and dots, when user drags the control points for complete function
          }else{
            updateCubic(getCurveCubic, dotCubicPoints);//update the curve and dots, when user drags the control points for inprogress function
          }

          visCubic.selectAll("circle.control_Cubic")
            .attr("cx", x_Cubic)
            .attr("cy", y_Cubic);
        })
        .on("dragend", function() {
          delete this.__origin__;
        }));


  var last = 0;

  //Timer to make it automate
  /*d3.timer(function(elapsed) {
    t = (t + (elapsed - last) / 5000) % 1;
    last = elapsed;
    //updateCubic();
  });*/

}

//Funtion to update the curve and dots, when user move the control points, slider, and change functionality
function updateCubic(getCurveCubicData, getDotCubicData) {
  var interpolationCubic = visCubic.selectAll("g")
      .data(function(d) {return getLevelsForlineCubic(d, t); });
  interpolationCubic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  //Create Line between control points
  var pathCubic = interpolationCubic.selectAll("path")
      .data(function(d) {return [d];});
  pathCubic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineCubic);
  pathCubic.attr("d", lineCubic);

  //Create bezier curve
  var curveCubic = visCubic.selectAll("path.curve1")
      .data(getCurveCubicData);
  curveCubic.enter().append("svg:path")
      .attr("class", "curve1");
  curveCubic.attr("d", lineCubic);

  //Create bezier dots
  $(".dotCubic").remove()
  var dotCubic = visCubic.selectAll("circle.dotCubic")
      .data(getDotCubicData)
      .enter().append("circle")
      .attr("class", "dotCubic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

}

//function to interpolate each bezier curve and bezier points
function interpolateCubic(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

//function to calculate the position of control points and send it to the interpolate to get each bezier value
function getLevelsCubic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsCubic.slice(0, d)];
  for (var i=1; i<4; i++) {
    x.push(interpolateCubic(x[x.length-1], t_));
  }
  return x;
}

////function to calculate the position of control points, and create line that connected control points
function getLevelsForlineCubic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsCubic.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateCubic(x[x.length-1], t_));
  }
  return x;
}

//Store all bezier points and dots to create the curve for inprogress functions
function getCurveCubic(d) {
  var curve = bezierCubicInprogress[d];
  if (!curve) {
    curve = bezierCubicInprogress[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsCubic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotCubicPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

//Store all bezier points and dots to create the curve for complete functions
function getCurveCubicComplete(d) {
  var curve = bezierCubicComplete[d];
  if (document.getElementById("complete").checked) {
    curve = bezierCubicComplete[d] = [];
    for (var t_=0; t_<=(delta*100); t_+=1) {
      var x = getLevelsCubic(d, t_/(delta*100));
      curve.push(x[x.length-1][0]);
    }
  }
  dotCubicPointsComplete = curve;
  return [curve];
}

function x_Cubic(d) { return d.x; } //get x value from the array
function y_Cubic(d) { return d.y; } //get y value from the array
function colour(d, i) {
  return d.length > 1 ? ["#000", "yellow", "blue", "green"][i] : "red"; //#000 black color for line between control points, red color for curve
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasCubic").addEventListener('touchmove', static, false);
