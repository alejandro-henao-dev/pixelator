import { DIRECTION } from "@/constants/directions";
import { ORIENTATIONS } from "@/constants/orientations";
import { IShapeSide } from "@/models/ShapeSide";
import { ISize } from "@/models/Size";

export function resizeByWidth(size:ISize,width: number): ISize {
  const calculatedHeight=width * size.height / size.width
  return { width, height:calculatedHeight }
}

export function resizeByHeight(size:ISize,height: number): ISize {
  const calculatedWidth = height * size.width / size.height
  return {
    width: calculatedWidth,
    height:height
  }
}

export function resizeByMaxSide(size:ISize, maxLength:number): ISize {
  const longerSide = getLongerSide(size)

  if (longerSide.orientation == ORIENTATIONS.horizontal) {
    return resizeByWidth(size,maxLength)
  }

  if (longerSide.orientation == ORIENTATIONS.vertical) {
    return resizeByHeight(size,maxLength)  
  }
  
  throw new Error("ResizeMath: Could not find the longer side of the size")
 }


function getLongerSide(size: ISize): IShapeSide{
  if (size.width > size.height) {
    return {
      orientation: ORIENTATIONS.horizontal,
      length:size.width
    }
  }
  return  {
    orientation: ORIENTATIONS.vertical,
    length:size.height
  }
}