$(function() {
  var zigZag = new ZigZag(new Position(16, 16), 20, "pink");
  $("input[type='submit']").click(() => {
    var i = parseInt($("input[name='i']").val());
    var j = parseInt($("input[name='j']").val());
    zigZag.delete();
    zigZag = new ZigZag(new Position(i, j), 20, "pink");
  });
});
