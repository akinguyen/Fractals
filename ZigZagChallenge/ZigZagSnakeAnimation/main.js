$(function() {
  var zigZag = new ZigZag(new Position(16, 16), 20);
  drawEngine(zigZag, zigZag.pathTraversal);
  $("input[type='submit']").click(() => {
    var i = parseInt($("input[name='i']").val());
    var j = parseInt($("input[name='j']").val());
    zigZag.delete();
    zigZag = new ZigZag(new Position(i, j), 20);
    drawEngine(zigZag, zigZag.pathTraversal);
  });
});
const drawEngine = (zigZag, path) => {
  var i = 0;
  var main = setInterval(() => {
    if (i == path.length - 1) {
      clearInterval(main);
    }
    zigZag.drawLine(path[i], path[i + 1]);
    i++;
  }, 15);
};
