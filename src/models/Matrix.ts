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

  static fromSize<T>(size:Size): Matrix<T | null>{
    const matrix:Array<Array<T | null>>=[]
    for (let col = 0; col < size.height; col++) {
      matrix.push([])
      for (let row = 0; row < size.width; row++) {
        matrix?.at(-1)?.push(null)
      }  
    }
    return new Matrix<T | null>(matrix, size)
  }
  
  at(point: Point): T  {
    if (point.x <= this.size.width && point.y <= this.size.height) {
      const select=this.cells.at(point.y)?.at(point.x)
      if (select) {
        return select
      }
    }
    throw new Error("point exceed the matrix size");
  }
  

  getSoroundingMatrix(centerPoint: Point, threshold: number = 1): Matrix<T> {
    
    if (threshold < 1) {
      throw new Error("Surounding threshold should be at least 1")
    }

    const length = (threshold * 2) + 1
    
    const size=new Size(length, length)
    const subMatrix: Array<Array<T>> = []
    
    for (let y = centerPoint.y - threshold; y <= centerPoint.y + threshold; y++) {
      subMatrix.push([])
      for (let x = centerPoint.x - threshold; x <= centerPoint.x + threshold; x++) {
        subMatrix?.at(-1)?.push( (this.cells[y][x]) as any) 
      
      }  
    }
    
    return new Matrix<T>(subMatrix, size)
  }
}