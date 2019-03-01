class ZigZag {
  constructor(end, widthBetween) {
    this.finalEnd = end;
    this.found = false;
    this.widthBetween = widthBetween;
    this.pathTraversal = [];
    this.initializeGrid();

    if (!(end.x == 0 || end.y == 0 || end.equals(new Position(1, 1)))) {
      this.drawNode(new Position(1, 1), end);
      this.pathTraversal.push(end);
    }
  }

  delete = () => {
    $("svg").remove();
  };

  initializeGrid = () => {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    $("body").append(this.svg);
  };

  getPath = (start, end) => {
    this.pathTraversal.push(start);
  };

  drawLine = (start, end) => {
    var newLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    newLine.setAttribute("x1", `${(start.y - 1) * this.widthBetween}`);
    newLine.setAttribute("y1", `${(start.x - 1) * this.widthBetween}`);
    newLine.setAttribute("x2", `${(end.y - 1) * this.widthBetween}`);
    newLine.setAttribute("y2", `${(end.x - 1) * this.widthBetween}`);
    newLine.setAttribute("stroke", "blue");
    newLine.setAttribute("stroke-linecap", "round");
    newLine.setAttribute("stroke-width", "2");
    $(this.svg).append(newLine);
  };

  findSize = end => {
    var size = 2;
    var main = end.x > end.y ? end.x : end.y;
    if (main <= size) {
      return 2;
    }
    while (main > size) {
      size *= 2;
    }
    this.svg.setAttribute("width", `${this.widthBetween * size}px`);
    this.svg.setAttribute("height", `${this.widthBetween * size}px`);
    return size;
  };

  computeFutureNodes = (start, widthBetween, order) => {
    var firstNode, nextNode;
    if (order == 1) {
      firstNode = new Position(start.x + widthBetween, start.y + widthBetween);
      nextNode = new Position(firstNode.x - widthBetween, firstNode.y + 1);
    } else {
      firstNode = new Position(start.x + widthBetween, start.y + widthBetween);
      nextNode = new Position(
        firstNode.x + 1,
        firstNode.y - widthBetween * 2 - 1
      );
    }
    return [firstNode, nextNode];
  };

  drawLineCheck(start, end) {
    if (!this.found) {
      if (end.equals(this.finalEnd)) {
        this.found = true;
      }
      this.getPath(start, end);
    }
  }

  drawZ = (start, end) => {
    this.drawLineCheck(start, new Position(start.x, start.y + 1));
    this.drawLineCheck(
      new Position(start.x, start.y + 1),
      new Position(start.x + 1, start.y)
    );
    this.drawLineCheck(new Position(start.x + 1, start.y), end);
  };

  drawZigZagLine(nextNodes) {
    this.drawLineCheck(nextNodes[0], nextNodes[1]);
  }
  drawNodeHelper = (start, end, size) => {
    var nextStart = start;
    var widthBetween = size / 2 - 1;
    if (widthBetween == 0) {
      this.drawZ(start, end);
      return;
    }
    var nextNodes = this.computeFutureNodes(nextStart, widthBetween, 1);
    this.drawNodeHelper(nextStart, nextNodes[0], size / 2);

    this.drawZigZagLine(nextNodes);
    nextStart = nextNodes[1];
    nextNodes = this.computeFutureNodes(nextNodes[1], widthBetween, 2);

    this.drawNodeHelper(nextStart, nextNodes[0], size / 2);
    this.drawZigZagLine(nextNodes);

    nextStart = nextNodes[1];
    nextNodes = this.computeFutureNodes(nextNodes[1], widthBetween, 1);
    this.drawNodeHelper(nextStart, nextNodes[0], size / 2);
    this.drawZigZagLine(nextNodes);

    nextStart = nextNodes[1];
    this.drawNodeHelper(nextStart, end, size / 2);
  };

  drawNode = (start, end) => {
    var size = this.findSize(end);
    this.drawNodeHelper(start, end, size);
  };
}
