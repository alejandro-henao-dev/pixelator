import { IPoint } from "./Point";
import { ISize } from "./Size";

export type IMatrix<T=any>= Array<Array<T>>
export interface getMatrixCellSoroundingOptions<T=any>{
  threshold?: number,
  emptyCell:T
}
export function getMatrixCellSorounding<T = any>(
  matrix: IMatrix<T>,
  centerPoint: IPoint,
  options:getMatrixCellSoroundingOptions<T>
):IMatrix<T> {
  const {
    threshold=1,
    emptyCell
  } = options ?? {}
  
  if (threshold < 1) {
    throw new Error("Surounding threshold should be at least 1")
  }

  const subMatrix: Array<Array<T>> = []
  
  for (let y = centerPoint.y - threshold; y <= centerPoint.y + threshold; y++) {
    subMatrix.push([])
    for (let x = centerPoint.x - threshold; x <= centerPoint.x + threshold; x++) {
      const currentCoord = {x,y}
      if (PointIsOutOfMatrix(matrix,currentCoord)) {
        subMatrix?.at(-1)?.push( emptyCell ) 
      } else {
        subMatrix?.at(-1)?.push( matrix[currentCoord.y][currentCoord.x]  ) 
      }
    
    }  
  }
  
  return subMatrix
}

export function PointIsOutOfMatrix(
  matrix: IMatrix<any>,
  point: IPoint,
) {
  const size=getMatrixSize(matrix)
  if (point.x >= size.width || point.y >= size.height) {
    return true
  }

  if (point.x < 0 || point.y < 0) {
    return true
  }
}

export function getMatrixSize(
  matrix: IMatrix
):ISize {
  const height = getMatrixHeight(matrix)
  const width = getMatrixWidth(matrix)
  return { width, height }
}

export function getMatrixWidth(
  matrix: IMatrix
):number {
  const rowsLengths = matrix.map(row => row.length)
  const biggerRowLength = Math.max(...rowsLengths)
  return biggerRowLength
}

export function getMatrixHeight(matrix:IMatrix): number{
  return matrix.length
}

export function MatrixforEach<T = any>(
  matrix: IMatrix<T>,
  callback: (cell: T, coords: IPoint) => void
):void {
  matrix.forEach((row,y) => {
    row.forEach((cell,x) => {
      callback(cell,{x,y})
    })
  })
}

export function map<I = any, O = any>(
  matrix: IMatrix<I>,
  callback: (cell: I, coords: IPoint) => O
):IMatrix<O> {
  return matrix.map((row,y) => {
    return row.map((cell,x) => {
      return callback(cell,{x,y})
    })
  })
}