import { DIRECTION } from "@/constants/directions";

export class ShapeSide{
  constructor(
    public direction: DIRECTION,
    public length: number,
  ){}
}