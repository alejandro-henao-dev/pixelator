import { ColorRBG } from "./ColorRBG";
import { Point } from "./Point";

export class Pixel{
  constructor(
    public color: ColorRBG,
    public coords?: Point | null,
    public empty?: boolean
  ){}
}
