export class Point{
  constructor(
    public x: number,
    public y:number
  ) { }
  

  equalTo(point: Point) {
    return this.x === point.x && point.y === this.y
  }

  /**
   * String Id based on coordenates. usefull for hashmaps
   */
  getHash() {
    return `${this.x}-${this.y}`
  }
}