$(function() {
  var tree = new Tree();
  var width = $(window).width();
  var start = new Vector(width / 2, 100);
  var end = new Vector(width / 2, 200);
  tree.drawRoot(start, end);
  tree.drawTree(start, end, 45, 100, 0.6);

  $(window).mousemove(function(event) {
    $("svg").empty();
    tree.drawRoot(start, end);
    var degree = interpolation(event.clientX, 0, width, 0, 360);
    tree.drawTree(start, end, degree, 100, 0.66);
  });
  var interpolation = (inputX, x1, x2, y1, y2) => {
    var outputY = ((y2 - y1) / (x2 - x1)) * (inputX - x1);
    return outputY;
  };
});
