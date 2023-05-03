import { Point } from "./Point";
import { Size } from "./Size";

export class Matrix<T> {
  public size: Size;
  
  /**
   * recommended matrix shape: matrix = row[ cell[] ]
   */
  constructor(
    public cells: Array<Array<T>>,
    public emptyCell: T
  ) { 
    this.size=this.getSize()
  }
  

  static fromSize<T>(size:Size, emptyCell:T): Matrix<T>{
    const matrix:Array<Array<T>>=[]
    for (let y = 0; y < size.height; y++) {
      matrix.push([])
      for (let x = 0; x < size.width; x++) {
        const currentY=matrix?.at(-1) 
        if (currentY) {
          currentY.push(emptyCell)  
        }
      }  
    }
    return new Matrix<T>(matrix,emptyCell)
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

    const subMatrix: Array<Array<T>> = []
    
    for (let y = centerPoint.y - threshold; y <= centerPoint.y + threshold; y++) {
      subMatrix.push([])
      for (let x = centerPoint.x - threshold; x <= centerPoint.x + threshold; x++) {
        const currentCoord = new Point(x, y)
        if (this.pointIsOutOfBoundaries(currentCoord)) {
          subMatrix?.at(-1)?.push( this.emptyCell ) 
        } else {
          subMatrix?.at(-1)?.push( this.cells[currentCoord.y][currentCoord.x]  ) 
        }
      
      }  
    }
    
    return new Matrix<T>(subMatrix, this.emptyCell)
  }

  private getSize(): Size{
    const height = this.getHeight()
    const width = this.getWidth()
    return new Size(width,height)
  }

  private getWidth():number {
    const rowsLengths = this.cells.map(row => row.length)
    const biggerRowLength = Math.max(...rowsLengths)
    return biggerRowLength
  }

  private getHeight(): number{
    return this.cells.length
  }

  private pointIsOutOfBoundaries(point: Point) {
    if (point.x >= this.size.width || point.y >= this.size.height) {
      return true
    }

    if (point.x < 0 || point.y < 0) {
      return true
    }
  }
}