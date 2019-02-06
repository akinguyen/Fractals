$(function() {
  var demonStart = new DemonStar();
  var width = $(window).width();
  var start = new Vector(width / 2 - 280, 200);
  var end = new Vector(width / 2 + 280, 200);
  demonStart.drawStar(start, end, 10);
  $(window).mousemove(function(event) {
    $("svg").empty();
    var n = interpolation(event.clientX, 0, width, 0, 200) + 4;
    if (event.clientX >= 0 && event.clientX < (width * 1.0) / 4.0) {
      demonStart.drawStar(start, end, 5);
    } else if (
      event.clientX >= (width * 1.0) / 4.0 &&
      event.clientX < (width * 2.0) / 4.0
    ) {
      demonStart.drawStar(start, end, 10);
    } else if (
      event.clientX >= (width * 1.0) / 2.0 &&
      event.clientX < (width * 2.0) / 4.0
    ) {
      demonStart.drawStar(start, end, 200);
    } else {
      demonStart.drawStar(start, end, n);
    }
    //demonStart.drawStar(start, end, n);
  });
  $(window).resize(function() {
    $("svg").empty();
    width = $(window).width();
    start = new Vector(width / 2 - 280, 200);
    end = new Vector(width / 2 + 280, 200);
    demonStart.drawStar(start, end, 10);
  });
  var interpolation = (inputX, x1, x2, y1, y2) => {
    var outputY = ((y2 - y1) / (x2 - x1)) * (inputX - x1);
    return outputY;
  };
});
