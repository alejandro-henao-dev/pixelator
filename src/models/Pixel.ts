import {  IColorRGBA } from "./ColorRBG";
import { IPoint } from "./Point";

export interface IPixel{
  color: IColorRGBA,
  coords?: IPoint | null,
  empty?: boolean
}