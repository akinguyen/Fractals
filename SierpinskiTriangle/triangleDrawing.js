$(function() {
  var width = $(window).width();
  var start = new Vector(width / 2 - 250, 550);
  var end = new Vector(width / 2 + 250, 550);
  var n = 200;
  var triangle = new Triangle(start, end);
  triangle.drawTriangle(start, end, n);

  $(window).resize(function() {
    $("svg").empty();
    width = $(window).width();
    start = new Vector(width / 2 - 250, 550);
    end = new Vector(width / 2 + 250, 550);
    triangle.init(start, end);
    triangle.drawTriangle(start, end, n);
  });

  $(window).mousemove(function(event) {
    $("svg").empty();
    triangle.init(start, end);
    if (event.clientX >= 0 && event.clientX < (width * 1.0) / 5.0) {
      n = 12;
      triangle.drawTriangle(start, end, n);
    } else if (
      event.clientX >= (width * 1.0) / 5.0 &&
      event.clientX < (width * 2.0) / 5.0
    ) {
      n = 25;
      triangle.drawTriangle(start, end, n);
    } else if (
      event.clientX >= (width * 2.0) / 5.0 &&
      event.clientX < (width * 3.0) / 5.0
    ) {
      n = 50;
      triangle.drawTriangle(start, end, n);
    } else if (
      event.clientX >= (width * 3.0) / 5.0 &&
      event.clientX < (width * 4.0) / 5.0
    ) {
      n = 100;
      triangle.drawTriangle(start, end, n);
    } else {
      n = 200;
      triangle.drawTriangle(start, end, n);
    }
  });
});
