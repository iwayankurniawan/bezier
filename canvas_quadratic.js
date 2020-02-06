var w = 200,
    h = 300
    padding = 10,
    pointsQuadratic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20}],
    bezierQuadratic = {},
    lineQuadratic = d3.svg.line().x(x_Quadratic).y(y_Quadratic),
    n = 4,
    ordersQuadratic = d3.range(5, n + 2);

var dotQuadraticPoints = {};

var visQuadratic = d3.select("#canvasQuadratic").selectAll("svg")
    .data(ordersQuadratic)
  .enter().append("svg:svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("svg:g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

visQuadratic.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "green");

updateQuadratic();

visQuadratic.selectAll("circle.control_Quadratic")
    .data(function(d) { return pointsQuadratic.slice(0, d) })
  .enter().append("svg:circle")
    .attr("class", "control_Quadratic")
    .attr("r", 17)
    .attr("cx", x_Quadratic)
    .attr("cy", y_Quadratic)
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        this.__origin__ = [d.x, d.y];
      })
      .on("drag", function(d) {
        d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
        d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        bezierQuadratic = {};
        updateQuadratic();
        visQuadratic.selectAll("circle.control_Quadratic")
          .attr("cx", x_Quadratic)
          .attr("cy", y_Quadratic);
      })
      .on("dragend", function() {
        delete this.__origin__;
      }));

var last = 0;

/*//Timer to make it automate
d3.timer(function(elapsed) {
  t = (t + (elapsed - last) / 5000) % 1;
  last = elapsed;
  updateQuadratic();
});*/

function updateQuadratic() {
  var interpolationQuadratic = visQuadratic.selectAll("g")
      .data(function(d) {return getLevelsForlineQuadratic(d, t); });
  interpolationQuadratic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  var pathQuadratic = interpolationQuadratic.selectAll("path")
      .data(function(d) {return [d];});
  pathQuadratic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineQuadratic);
  pathQuadratic.attr("d", lineQuadratic);

  var curveQuadratic = visQuadratic.selectAll("path.curve1")
      .data(getCurveQuadratic);
  curveQuadratic.enter().append("svg:path")
      .attr("class", "curve1");
  curveQuadratic.attr("d", lineQuadratic);

  $(".dotQuadratic").remove()
  var dotQuadratic = visQuadratic.selectAll("circle.dotQuartic")
      .data(dotQuadraticPoints)
      .enter().append("circle")
      .attr("class", "dotQuadratic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });


}

function interpolateQuadratic(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}


function getLevelsQuadratic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuadratic.slice(0, d)];
  for (var i=1; i<3; i++) {
    x.push(interpolateQuadratic(x[x.length-1], t_));
  }
  return x;
}

function getLevelsForlineQuadratic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuadratic.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateQuadratic(x[x.length-1], t_));
  }
  return x;
}

function getCurveQuadratic(d) {
  var curve = bezierQuadratic[d];
  if (!curve) {
    curve = bezierQuadratic[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsQuadratic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuadraticPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

function x_Quadratic(d) { return d.x; }
function y_Quadratic(d) { return d.y; }
function colour(d, i) {
  return d.length > 1 ? ["#ccc", "yellow", "blue", "green"][i] : "red";
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasQuadratic").addEventListener('touchmove', static, false);
