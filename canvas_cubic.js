var pointsCubic = [{x: 20, y: 250}, {x: 20, y: 30},{x: 100, y: 20},{x:150,y:150}],
    bezierCubicComplete = {},
    bezierCubicInprogress = {},
    lineCubic = d3.svg.line().x(x_Cubic).y(y_Cubic),
    n = 4,
    ordersCubic = d3.range(5, n + 2);

    var visCubic;
    var dotCubicPoints = {};
    var dotCubicPointsComplete = {};

    var startTheCubic = d3.select("#canvasCubic").selectAll("svg")
    .data(ordersCubic)
    .enter().append("svg:svg")
    .attr("width", w + 2 * padding)
    .attr("height",topBorder + h + 2 * padding)
      .attr("transform", "translate(" + padding + "," + topBorder + ")");

    startTheCubic.append("rect")
        .attr("width", w + 2 * padding)
        .attr("height",  h + 2 * padding)
        .attr("fill", "#ffc7c7")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    startCubic();

    function startCubic (){
      visCubic = startTheCubic.append("svg:g")
                  .attr("id","reset")
                  .attr("transform", "translate(" + padding + "," + padding + ")");


    updateCubic(getCurveCubic, dotCubicPoints);

    visCubic.selectAll("circle.control_Cubic")
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
      .on("drag", function(d) {
        d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
        d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        bezierCubicComplete = {};
        bezierCubicInprogress = {};

        if (document.getElementById("complete").checked) {
          updateCubic(getCurveCubicComplete, dotCubicPointsComplete);
        }else{
          updateCubic(getCurveCubic, dotCubicPoints);
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

    function updateCubic(getCurveCubicData, getDotCubicData) {
    var interpolationCubic = visCubic.selectAll("g")
      .data(function(d) {return getLevelsForlineCubic(d, t); });
    interpolationCubic.enter().append("svg:g")
      .style("fill", colour)
      .style("stroke", colour);

    var pathCubic = interpolationCubic.selectAll("path")
      .data(function(d) {return [d];});
    pathCubic.enter().append("svg:path")
      .attr("class", "line")
      .attr("d", lineCubic);
    pathCubic.attr("d", lineCubic);

    var curveCubic = visCubic.selectAll("path.curve1")
      .data(getCurveCubicData);
    curveCubic.enter().append("svg:path")
      .attr("class", "curve1");
    curveCubic.attr("d", lineCubic);

    $(".dotCubic").remove()

    var dotCubic = visCubic.selectAll("circle.dotCubic")
      .data(getDotCubicData)
      .enter().append("circle")
      .attr("class", "dotCubic")
    .attr("r",1.3)
    .attr("cx", function(d,i) { return d.x; })
    .attr("cy", function(d,i) { return d.y; });

    }


    function interpolateCubic(d, p) {
    if (arguments.length < 2) p = t;
    var r = [];
    for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
    }
    return r;
    }

    function getLevelsCubic(d, t_) {
    if (arguments.length < 2) t_ = t;
    var x = [pointsCubic.slice(0, d)];
    for (var i=1; i<4; i++) {
    x.push(interpolateCubic(x[x.length-1], t_));
    }
    return x;
    }

    function getLevelsForlineCubic(d, t_) {
    if (arguments.length < 2) t_ = t;
    var x = [pointsCubic.slice(0, d)];
    for (var i=1; i<1; i++) {
    x.push(interpolateCubic(x[x.length-1], t_));
    }
    return x;
    }

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

    function getCurveCubicComplete(d) {
    var curve = bezierCubicComplete[d];
    if (document.getElementById("complete").checked) {
    curve = bezierCubicComplete[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevelsCubic(d, t_);
      curve.push(x[x.length-1][0]);
    }
    }
    dotCubicPointsComplete = curve;
    return [curve];
    }

    function x_Cubic(d) { return d.x; }
    function y_Cubic(d) { return d.y; }
    function colour(d, i) {
    return d.length > 1 ? ["#000", "yellow", "blue", "green"][i] : "red";
    }

    var static = function(event) { event.preventDefault(); }
    document.getElementById("canvasCubic").addEventListener('touchmove', static, false);
