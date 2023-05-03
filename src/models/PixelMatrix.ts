import { ColorRBG } from "./ColorRBG";
import { Matrix } from "./Matrix";
import { Pixel } from "./Pixel";

export class PixelMatrix extends Matrix<Pixel>{
  
  
  constructor(matrix:Array<Array<Pixel>>, emptyPixel?:Pixel) {
    super(matrix, emptyPixel ?? new Pixel(new ColorRBG(255,255,255),null,true))
  }


}