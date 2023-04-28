import { DIRECTION } from "@/constants/directions";
import { ShapeSide } from "@/models/ShapeSide";
import { Size } from "@/models/Size";

export class Resizer{

  private size: Size;

  constructor(size: Size) {
    this.size=size
  }
  
  resizeByWidth(width: number): Size {
    const calculatedHeight=width * this.size.height / this.size.width
    return new Size(width, calculatedHeight)
  }

  resizeByHeight(height: number): Size {
    const calculatedWidth = height * this.size.width / this.size.height
    return new Size(calculatedWidth,height)
  }

  resizeByMaxSide(maxLength:number): Size {
    const longerSide = this.getLongerSide(this.size)

    if (longerSide.direction == DIRECTION.horizontal) {
      return this.resizeByWidth(maxLength)
    }

    if (longerSide.direction == DIRECTION.vertical) {
      return this.resizeByHeight(maxLength)  
    }
    
    throw new Error("ResizeMath: Could not find the longer side of the size")
   }
  

  private getLongerSide(size: Size): ShapeSide{
    if (size.width > size.height) {
      return new ShapeSide(DIRECTION.horizontal,size.width)  
    }
    return new ShapeSide(DIRECTION.vertical,size.height)
  }
}
