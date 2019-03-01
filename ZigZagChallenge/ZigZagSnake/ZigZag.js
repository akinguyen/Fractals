class ZigZag {
  constructor(end, widthBetween, color) {
    this.color = color;
    this.finalEnd = end;
    this.found = false;
    this.widthBetween = widthBetween;
    this.pathTraversal = [];
    this.initializeGrid();
    if (!(end.x == 0 || end.y == 0 || end.equals(new Position(1, 1)))) {
      this.drawZigZag();
    }
  }

  delete = () => {
    $("svg").remove();
  };

  initializeGrid = () => {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", `${this.widthBetween * this.finalEnd.y}px`);
    this.svg.setAttribute("height", `${this.widthBetween * this.finalEnd.x}px`);
    $("body").append(this.svg);
  };

  drawLineCheck(start, end) {
    if (!this.found) {
      if (end.equals(this.finalEnd)) {
        this.found = true;
      }
      this.drawLine(start, end);
    }
  }

  drawLine = (start, end) => {
    this.pathTraversal.push(start);
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${(start.y - 1) * this.widthBetween}`);
    newLine.setAttribute("y1", `${(start.x - 1) * this.widthBetween}`);
    newLine.setAttribute("x2", `${(end.y - 1) * this.widthBetween}`);
    newLine.setAttribute("y2", `${(end.x - 1) * this.widthBetween}`);
    newLine.setAttribute("stroke", this.color);
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "2");
    $(this.svg).append(newLine);
  };

  drawZigZag = () => {
    var currentPos = new Position(1, 1);
    var dx, dy;
    var previousPos = currentPos.copy();
    while (!this.found) {
      if (currentPos.equals(new Position(this.finalEnd.x, 1))) {
        currentPos.y++;
        this.drawLineCheck(previousPos, currentPos);
        previousPos = currentPos.copy();
        currentPos.y++;
        currentPos.x--;
        dx = -1;
        dy = 1;
      } else if (currentPos.y == this.finalEnd.y) {
        currentPos.x += 1;
        this.drawLineCheck(previousPos, currentPos);
        previousPos = currentPos.copy();
        currentPos.y--;
        currentPos.x++;
        dx = 1;
        dy = -1;
      } else if (currentPos.y == 1) {
        currentPos.x += 1;
        this.drawLineCheck(previousPos, currentPos);
        previousPos = currentPos.copy();
        currentPos.x--;
        currentPos.y++;
        dx = -1;
        dy = 1;
      } else if (currentPos.x == 1) {
        currentPos.y += 1;
        this.drawLineCheck(previousPos, currentPos);
        previousPos = currentPos.copy();
        currentPos.y--;
        currentPos.x++;
        dx = 1;
        dy = -1;
      } else if (currentPos.x == this.finalEnd.x) {
        currentPos.y += 1;
        this.drawLineCheck(previousPos, currentPos);
        previousPos = currentPos.copy();
        currentPos.y++;
        currentPos.x--;
        dy = 1;
        dx = -1;
      } else {
        currentPos.x += dx;
        currentPos.y += dy;
      }
      this.drawLineCheck(previousPos, currentPos);
      previousPos = currentPos.copy();
    }
  };
}
