class Tree {
  constructor() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    $(this.svg).css("position", "absolute");
    $("body").append(this.svg);
  }

  drawRoot(start, end) {
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${start.x}`);
    newLine.setAttribute("y1", `${start.y}`);
    newLine.setAttribute("x2", `${end.x}`);
    newLine.setAttribute("y2", `${end.y}`);
    newLine.setAttribute("stroke", "green");
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "2");
    $(this.svg).append(newLine);
  }
  drawTree(start, end, degree, length, ratio) {
    if (length < 2) {
      return;
    }
    var leftBranch = this.drawBranch(start, end, degree, length);
    this.drawTree(end, leftBranch, degree, length * ratio, ratio);
    var rightBranch = this.drawBranch(start, end, -1 * degree, length);
    this.drawTree(end, rightBranch, degree, length * ratio, ratio);
  }
  drawBranch(start, end, degree, length) {
    var newBranch = Vector.sub(end, start)
      .normalize()
      .mul(length);
    newBranch = this.rotate(newBranch, degree);
    newBranch = Vector.add(end, newBranch);
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${end.x}`);
    newLine.setAttribute("y1", `${end.y}`);
    newLine.setAttribute("x2", `${newBranch.x}`);
    newLine.setAttribute("y2", `${newBranch.y}`);
    newLine.setAttribute("stroke", "green");
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "2");
    $(this.svg).append(newLine);
    return newBranch;
  }
  rotate(vector, degree) {
    var radian = (degree * Math.PI) / 180;
    var x = vector.x * Math.cos(radian) + vector.y * Math.sin(radian);
    var y = vector.y * Math.cos(radian) - vector.x * Math.sin(radian);
    return new Vector(x, y);
  }
}
