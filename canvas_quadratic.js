//------------------This code for Quadratic Canvas, to make Quadratic Bezier Curve
var pointsQuadratic = [{x: 20,y: 250}, {x: 20,y: 30}, {x: 100,y: 20}], //Initial position for control points in Quadratic Canvas
    bezierQuadraticComplete = {},//array to save Quadratic value for complete functionality
    bezierQuadraticInprogress = {},//array to save Quadratic value for inprogress functionality
    lineQuadratic = d3.svg.line().x(x_Quadratic).y(y_Quadratic), //function from d3.js to create line, the value depends on x_Quadratic and Y_Quadratic
    n = 4,
    ordersQuadratic = d3.range(5, n + 2);

var visQuadratic;//Variable to hold the value of bezier Quadratic create by d3.js
var dotQuadraticPoints = {}; //array to save dot Quadratic value for inprogress functionality
var dotQuadraticPointsComplete = {}; //array to save dot Quadratic value for complete functionality


var startTheQuadratic = d3.select("#canvasQuadratic").selectAll("svg") //create the svg canvas and positioning the canvas
        .data(ordersQuadratic)
        .enter()
        .append("svg:svg")
        .attr("width", w + 2 * padding)
        .attr("height",topBorder + h + 2 * padding)
        .attr("transform", "translate(" + padding + "," + topBorder + ")");

    startTheQuadratic.append("rect")//Create the canvas background color and make border of the canvas
        .attr("width", w + 2 * padding)
        .attr("height",  h + 2 * padding)
        .attr("fill", "#b09343")//Color for canvas background
        .attr("stroke", "black")
        .attr("stroke-width", 2);

startQuadratic();//start create the control points for Quadratic curve

//-------------------function to create control points, drag and drop functionality, for Quadratic curves--------------
function startQuadratic () {
  visQuadratic = startTheQuadratic.append("svg:g")
              .attr("id","reset")
              .attr("transform", "translate(" + padding + "," + padding + ")");

  updateQuadratic(getCurveQuadratic, dotQuadraticPoints);//start create the bezier curves and dots

  visQuadratic.selectAll("circle.control_Quadratic")//create the control points, set control points first position
      .data(function(d) {return pointsQuadratic.slice(0, d) })
      .enter().append("svg:circle")
      .attr("class", "control_Quadratic")
      .attr("r", 6)
      .attr("cx", x_Quadratic)
      .attr("cy", y_Quadratic)
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          this.__origin__ = [d.x, d.y];
        })
        .on("drag", function(d) {//update the position of control points when drag and drop happens
          d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
          d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
          bezierQuadraticComplete = {};
          bezierQuadraticInprogress = {};

          if (document.getElementById("complete").checked) {
            updateQuadratic(getCurveQuadraticComplete, dotQuadraticPointsComplete);//update the curve and dots, when user drags the control points for complete function
          }else{
            updateQuadratic(getCurveQuadratic, dotQuadraticPoints);//update the curve and dots, when user drags the control points for inprogress function
          }

          visQuadratic.selectAll("circle.control_Quadratic")
            .attr("cx", x_Quadratic)
            .attr("cy", y_Quadratic);
        })
        .on("dragend", function() {
          delete this.__origin__;
        }));


  var last = 0;

  //Timer to make it automate
  /*d3.timer(function(elapsed) {
    t = (t + (elapsed - last) / 5000) % 1;
    last = elapsed;
    //updateQuadratic();
  });*/

}

//Funtion to update the curve and dots, when user move the control points, slider, and change functionality
function updateQuadratic(getCurveQuadraticData, getDotQuadraticData) {
  var interpolationQuadratic = visQuadratic.selectAll("g")
      .data(function(d) {return getLevelsForlineQuadratic(d, t); });
  interpolationQuadratic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  //Create Line between control points
  var pathQuadratic = interpolationQuadratic.selectAll("path")
      .data(function(d) {return [d];});
  pathQuadratic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineQuadratic);
  pathQuadratic.attr("d", lineQuadratic);

  //Create bezier curve
  var curveQuadratic = visQuadratic.selectAll("path.curve1")
      .data(getCurveQuadraticData);
  curveQuadratic.enter().append("svg:path")
      .attr("class", "curve1");
  curveQuadratic.attr("d", lineQuadratic);

  //Create bezier dots
  $(".dotQuadratic").remove()
  var dotQuadratic = visQuadratic.selectAll("circle.dotQuadratic")
      .data(getDotQuadraticData)
      .enter().append("circle")
      .attr("class", "dotQuadratic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

}

//function to interpolate each bezier curve and bezier points
function interpolateQuadratic(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

//function to calculate the position of control points and send it to the interpolate to get each bezier value
function getLevelsQuadratic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuadratic.slice(0, d)];
  for (var i=1; i<3; i++) {
    x.push(interpolateQuadratic(x[x.length-1], t_));
  }
  return x;
}

////function to calculate the position of control points, and create line that connected control points
function getLevelsForlineQuadratic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuadratic.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateQuadratic(x[x.length-1], t_));
  }
  return x;
}

//Store all bezier points and dots to create the curve for inprogress functions
function getCurveQuadratic(d) {
  var curve = bezierQuadraticInprogress[d];
  if (!curve) {
    curve = bezierQuadraticInprogress[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsQuadratic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuadraticPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

//Store all bezier points and dots to create the curve for complete functions
function getCurveQuadraticComplete(d) {
  var curve = bezierQuadraticComplete[d];
  if (document.getElementById("complete").checked) {
    curve = bezierQuadraticComplete[d] = [];
    for (var t_=0; t_<=(delta*100); t_+=1) {
      var x = getLevelsQuadratic(d, t_/(delta*100));
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuadraticPointsComplete = curve;
  return [curve];
}

function x_Quadratic(d) { return d.x; } //get x value from the array
function y_Quadratic(d) { return d.y; } //get y value from the array
function colour(d, i) {
  return d.length > 1 ? ["#000", "yellow", "blue", "green"][i] : "red"; //#000 black color for line between control points, red color for curve
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasQuadratic").addEventListener('touchmove', static, false);
