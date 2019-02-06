class Triangle {
  constructor(start, end) {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    $(this.svg).css("position", "absolute");
    $("body").append(this.svg);
    this.init(start, end);
  }

  init(start, end) {
    var newPolygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    var mid = this.getMidPoint(start, end);
    var points = `${start.x},${start.y} ${end.x},${end.y} ${mid.x},${mid.y}`;
    newPolygon.setAttribute("points", points);
    newPolygon.setAttribute("stroke", "yellow");
    newPolygon.setAttribute("stroke-width", "2");
    newPolygon.setAttribute("fill", "yellow");
    $(this.svg).append(newPolygon);
  }

  drawTriangle(start, end, n) {
    if (Vector.getDistance(end, start) < n) {
      return;
    }
    var mid = this.getMidPoint(start, end);
    var m1 = new Vector((start.x + mid.x) / 2.0, (start.y + mid.y) / 2.0);
    var m2 = new Vector((start.x + end.x) / 2.0, (start.y + end.y) / 2.0);
    var m3 = new Vector((mid.x + end.x) / 2.0, (mid.y + end.y) / 2.0);
    var newPolygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    var mid = this.getMidPoint(start, end);
    var points = `${m1.x},${m1.y} ${m2.x},${m2.y} ${m3.x},${m3.y}`;
    newPolygon.setAttribute("points", points);
    newPolygon.setAttribute("stroke", "black");
    newPolygon.setAttribute("stroke-width", "2");
    newPolygon.setAttribute("fill", "black");
    $(this.svg).append(newPolygon);

    this.drawTriangle(m1, m3, n);
    this.drawTriangle(start, m2, n);
    this.drawTriangle(m2, end, n);
  }

  getMidPoint(start, end) {
    var b = Vector.sub(end, start);
    var mid = Vector.add(start, this.rotate(b, 60));
    return mid;
  }
  rotate(vector, degree) {
    var radian = (degree * Math.PI) / 180;
    var x = vector.x * Math.cos(radian) + vector.y * Math.sin(radian);
    var y = vector.y * Math.cos(radian) - vector.x * Math.sin(radian);
    return new Vector(x, y);
  }
}
