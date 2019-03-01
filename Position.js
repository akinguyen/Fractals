class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(other) {
    return this.x == other.x && this.y == other.y;
  }
  copy() {
    return new Position(this.x, this.y);
  }
  print() {
    console.log(`(${this.x},${this.y})`);
  }
}
