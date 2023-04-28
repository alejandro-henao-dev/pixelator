import { Point } from "./Point";
import { Size } from "./Size";

export class Matrix<T> {

  /**
   * recommended matrix shape: matrix = row[ cell[] ]
   */
  constructor(
    public cells: Array<Array<T>>,
    public size: Size
  ) { }
  
  at(point:Point) {
    return this.cells.at(point.x)?.at(point.y)
  }
}