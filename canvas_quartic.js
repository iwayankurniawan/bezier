var w = 200,
    h = 300,
    t = 0,
    delta = .01,
    padding = 10,
    pointsQuartic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150},{x:175,y:230}],
    bezierQuartic = {},
    lineQuartic = d3.svg.line().x(x_Quartic).y(y_Quartic),
    n = 4,
    ordersQuartic = d3.range(5, n + 2);

var dotQuarticPoints = {};

var visQuartic = d3.select("#canvasQuartic").selectAll("svg")
    .data(ordersQuartic)
  .enter().append("svg:svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("svg:g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

visQuartic.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "green");

updateQuartic();

visQuartic.selectAll("circle.control_Quartic")
    .data(function(d) { return pointsQuartic.slice(0, d) })
  .enter().append("svg:circle")
    .attr("class", "control_Quartic")
    .attr("r", 17)
    .attr("cx", x_Quartic)
    .attr("cy", y_Quartic)
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        this.__origin__ = [d.x, d.y];
      })
      .on("drag", function(d) {
        d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
        d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        bezierQuartic = {};
        updateQuartic();
        visQuartic.selectAll("circle.control_Quartic")
          .attr("cx", x_Quartic)
          .attr("cy", y_Quartic);
      })
      .on("dragend", function() {
        delete this.__origin__;
      }));

var last = 0;
/*
d3.timer(function(elapsed) {
  t = (t + (elapsed - last) / 5000) % 1;
  last = elapsed;
  updateQuartic();
});*/

function updateQuartic() {
  var interpolationQuartic = visQuartic.selectAll("g")
      .data(function(d) {return getLevelsForlineQuartic(d, t); });
  interpolationQuartic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

  var pathQuartic = interpolationQuartic.selectAll("path")
      .data(function(d) {return [d];});
  pathQuartic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineQuartic);
  pathQuartic.attr("d", lineQuartic);

  var curveQuartic = visQuartic.selectAll("path.curve1")
      .data(getCurveQuartic);
  curveQuartic.enter().append("svg:path")
      .attr("class", "curve1");
  curveQuartic.attr("d", lineQuartic);

  $(".dotQuartic").remove();
  var dotQuartic = visQuartic.selectAll("circle.dotQuartic")
      .data(dotQuarticPoints)
      .enter().append("circle")
      .attr("class", "dotQuartic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

}

function interpolateQuartic(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}


function getLevelsQuartic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuartic.slice(0, d)];
  for (var i=1; i<5; i++) {
    x.push(interpolateQuartic(x[x.length-1], t_));
  }
  return x;
}

function getLevelsForlineQuartic(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [pointsQuartic.slice(0, d)];
  for (var i=1; i<1; i++) {
    x.push(interpolateQuartic(x[x.length-1], t_));
  }
  return x;
}

function getCurveQuartic(d) {
  var curve = bezierQuartic[d];
  if (!curve) {
    curve = bezierQuartic[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsQuartic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  dotQuarticPoints = curve.slice(0, t / delta + 1);
  return [curve.slice(0, t / delta + 1)];
}

function getCurveQuartic1(d) {
  var curve = bezierQuartic[d];
  if (!curve) {
    curve = bezierQuartic[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsQuartic(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  return curve.slice(0, t / delta + 1);
}

function x_Quartic(d) { return d.x; }
function y_Quartic(d) { return d.y; }
function colour(d, i) {
  return d.length > 1 ? ["#ccc", "yellow", "blue", "green"][i] : "red";
}

var static = function(event) { event.preventDefault(); }
document.getElementById("canvasQuartic").addEventListener('touchmove', static, false);
