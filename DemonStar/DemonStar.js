class DemonStar {
  constructor() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    $(this.svg).css("position", "absolute");
    $("body").append(this.svg);
  }
  drawStar(start, end, n) {
    this.drawStarSide(start, end, n);
    this.drawStarSide(
      end,
      Vector.add(end, this.rotate(Vector.sub(end, start), -120)),
      n
    );
    var begin = Vector.add(end, this.rotate(Vector.sub(end, start), -120));
    this.drawStarSide(
      begin,
      Vector.add(begin, this.rotate(Vector.sub(begin, start), 180)),
      n
    );
  }
  drawStarSide(start, end, n) {
    if (Vector.getDistance(end, start) < n) {
      return;
    }
    var b = Vector.sub(end, start);
    var b_over_3 = b.getCopy().divide(3);
    var c1 = Vector.add(start, b_over_3);
    var c2 = Vector.add(start, b.getCopy().mul(2.0 / 3.0));
    var c3 = Vector.add(c1, this.rotate(b_over_3, 60));
    this.drawLine(start, c1);
    this.drawLine(c1, c3);
    this.drawLine(c3, c2);
    this.drawLine(c2, end);

    this.removeLine(c1, c2);

    //Recursion Star
    this.drawStarSide(start, c1, n);
    this.drawStarSide(c1, c3, n);
    this.drawStarSide(c3, c2, n);
    this.drawStarSide(c2, end, n);
  }
  removeLine(start, end) {
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${start.x}`);
    newLine.setAttribute("y1", `${start.y}`);
    newLine.setAttribute("x2", `${end.x}`);
    newLine.setAttribute("y2", `${end.y}`);
    newLine.setAttribute("stroke", "black");
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "3.1");

    //newLine.setAttribute("stroke-opacity", "0.3");
    $(this.svg).append(newLine);
  }
  drawLine(start, end) {
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${start.x}`);
    newLine.setAttribute("y1", `${start.y}`);
    newLine.setAttribute("x2", `${end.x}`);
    newLine.setAttribute("y2", `${end.y}`);
    newLine.setAttribute("stroke", "red");
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "2");
    $(this.svg).append(newLine);
  }
  rotate(vector, degree) {
    var radian = (degree * Math.PI) / 180;
    var x = vector.x * Math.cos(radian) + vector.y * Math.sin(radian);
    var y = vector.y * Math.cos(radian) - vector.x * Math.sin(radian);
    return new Vector(x, y);
  }
}
