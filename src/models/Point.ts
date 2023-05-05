


export interface IPoint{
  x: number,
  y:number
}

export const pointToString= (point: IPoint)=>{
  return `${point.x}-${point.y}`
}

export const pointEqualTo = (reference: IPoint, compare: IPoint) => {
  return reference.x === compare.x && compare.y === reference.y
}