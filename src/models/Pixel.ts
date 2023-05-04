import { ColorRGBA } from "./ColorRBG";
import { Point } from "./Point";

export class Pixel{
  constructor(
    public color: ColorRGBA,
    public coords?: Point | null,
    public empty?: boolean
  ){}
}
