//------------------This code for Quartic Canvas, to make Quartic Bezier Curve
var pointsQuartic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150},{x:175,y:230}], //Initial position for control points in Quartic Canvas
    bezierQuarticComplete = {},//array to save Quartic value for complete functionality
    bezierQuarticInprogress = {},//array to save Quartic value for inprogress functionality
    lineQuartic = d3.svg.line().x(x_Quartic).y(y_Quartic), //function from d3.js to create line, the value depends on x_Quartic and Y_Quartic
    n = 4,
    ordersQuartic = d3.range(5, n + 2);

var visQuartic;//Variable to hold the value of bezier Quartic create by d3.js
var dotQuarticPoints = {}; //array to save dot Quartic value for inprogress functionality
var dotQuarticPointsComplete = {}; //array to save dot Quartic value for complete functionality


var startTheQuartic = d3.select("#canvasQuartic").selectAll("svg") //create the svg canvas and positioning the canvas
        .data(ordersQuartic)
        .enter()
        .append("svg:svg")
        .attr("width", w + 2 * padding)
        .attr("height",topBorder + h + 2 * padding)
        .attr("transform", "translate(" + padding + "," + topBorder + ")");

    startTheQuartic.append("rect")//Create the canvas background color and make border of the canvas
        .attr("width", w + 2 * padding)
        .attr("height",  h + 2 * padding)
        .attr("fill", "#a4c6f5") //Color for canvas background
        .attr("stroke", "black")
        .attr("stroke-width", 2);

startQuartic();//start create the control points for Quartic curve

//-------------------function to create control points, drag and drop functionality, for Quartic curves--------------
function startQuartic () {
  visQuartic = startTheQuartic.append("svg:g")
              .attr("id","reset")
              .attr("transform", "translate(" + padding + "," + padding + ")");

  updateQuartic(getCurveQuartic, dotQuarticPoints);//start create the bezier curves and dots

  visQuartic.selectAll("circle.control_Quartic")//create the control points, set control points first position
      .data(function(d) {return pointsQuartic.slice(0, d) })
      .enter().append("svg:circle")
      .attr("class", "control_Quartic")
      .attr("r", 6)
      .attr("cx", x_Quartic)
      .attr("cy", y_Quartic)
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          this.__origin__ = [d.x, d.y];
        })
        .on("drag", function(d) {//update the position of control points when drag and drop happens
          d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
          d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
          bezierQuarticComplete = {};
          bezierQuarticInprogress = {};

          if (document.getElementById("complete").checked) {
            updateQuartic(getCurveQuarticComplete, dotQuarticPointsComplete);//update the curve and dots, when user drags the control points for complete function
          }else{
            updateQuartic(getCurveQuartic, dotQuarticPoints);//update the curve and dots, when user drags the control points for inprogress function
          }

          visQuartic.selectAll("circle.control_Quartic")
            .attr("cx", x_Quartic)
            .attr("cy", y_Quartic);
        })
        .on("dragend", function() {
          delete this.__origin__;
        }));


  var last = 0;

  //Timer to make it automate
  /*d3.timer(function(elapsed) {
    t = (t + (elapsed - last) / 5000) % 1;
    last = elapsed;
    //updateQuartic();
  });*/

}

//Funtion to update the curve and dots, when user move the control points, slider, and change functionality
function updateQuartic(getCurveQuarticData, getDotQuarticData) {
  var interpolationQuartic = visQuartic.selectAll("g")
      .data(function(d) {return getLevelsForlineQuartic(d, t); });
  interpolationQuartic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  //Create Line between control points
  var pathQuartic = interpolationQuartic.selectAll("path")
      .data(function(d) {return [d];});
  pathQuartic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineQuartic);
  pathQuartic.attr("d", lineQuartic);

  //Create bezier curve
  var curveQuartic = visQuartic.selectAll("path.curve1")
      .data(getCurveQuarticData);
  curveQuartic.enter().append("svg:path")
      .attr("class", "curve1");
  curveQuartic.attr("d", lineQuartic);

  //Create bezier dots
  $(".dotQuartic").remove()
  var dotQuartic = visQuartic.selectAll("circle.dotQuartic")
      .data(getDotQuarticData)
      .enter().append("circle")
      .attr("class", "dotQuartic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

}

//function to interpolate each bezier curve and bezier points
function interpolateQuartic(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

//function to calculate the position of control points and send it to the interpolate to get each bezier value
function getLevelsQuartic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuartic.slice(0, d)];
  for (var i=1; i<5; i++) {
    x.push(interpolateQuartic(x[x.length-1], t_));
  }
  return x;
}

////function to calculate the position of control points, and create line that connected control points
function getLevelsForlineQuartic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuartic.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateQuartic(x[x.length-1], t_));
  }
  return x;
}

//Store all bezier points and dots to create the curve for inprogress functions
function getCurveQuartic(d) {
  var curve = bezierQuarticInprogress[d];
  if (!curve) {
    curve = bezierQuarticInprogress[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsQuartic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuarticPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

//Store all bezier points and dots to create the curve for complete functions
function getCurveQuarticComplete(d) {
  var curve = bezierQuarticComplete[d];
  if (document.getElementById("complete").checked) {
    curve = bezierQuarticComplete[d] = [];
    for (var t_=0; t_<=(delta*100); t_+=1) {
      var x = getLevelsQuartic(d, t_/(delta*100));
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuarticPointsComplete = curve;
  return [curve];
}

function x_Quartic(d) { return d.x; } //get x value from the array
function y_Quartic(d) { return d.y; } //get y value from the array
function colour(d, i) {
  return d.length > 1 ? ["#000", "yellow", "blue", "green"][i] : "red"; //#000 black color for line between control points, red color for curve
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasQuartic").addEventListener('touchmove', static, false);
