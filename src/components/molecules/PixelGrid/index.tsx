import { useState } from "react";
import { Matrix } from "@/models/Matrix";
import { Pixel } from "@/models/Pixel";
import { Point } from "@/models/Point";
import styles from "./index.module.scss"
import { PixelDraw } from "@/components/atoms/pixelDraw";
import { classnames } from "@/utils/classnames";
import { ColorRGBA } from "@/models/ColorRBG";

export interface PixelGridProps{
  pixels: Matrix<Pixel>,
  selected?: Point,
  onPixelClick?: (point: Point) => void,
  onPixelMouseEnter?: (event: any) => void,
  onPixelMouseLeave?: (event: any) => void,
  className?: string,
  pixelClassName?: string,
  selectedPixelClassName?: string,
  displayBorders?: boolean,
  borderColor?:ColorRGBA
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  pixels,
  selected,
  pixelClassName,
  className,
  selectedPixelClassName,
  onPixelClick: onClick=()=>{},
  onPixelMouseEnter=() => { },
  onPixelMouseLeave = () => { },
  displayBorders,
  borderColor= new ColorRGBA(0,0,0)
}) => {

  return <>
    <div className={classnames(styles.imgGrid, className)}>
    {pixels.cells.map((row, y) => {
      return <div className={styles.row} key={`row - ${y}`}>
        {row.map((pixel, x) => <>
          <PixelDraw
            cssVars={{
              '--border-color':borderColor.getCssFormat()
            }}
            pixel={pixel}
            key={`${y} - ${x}`}
            className={classnames(
              styles.cell,
              pixelClassName,
              displayBorders && styles.borders,
              selected?.equalTo(new Point(x, y)) && selectedPixelClassName
            )}
            onMouseEnter={onPixelMouseEnter}
            onMouseLeave={onPixelMouseLeave}
            onClick={()=>onClick(new Point(x, y))}
          />
        </>)}
      </div>
    })}
  </div>
  </>
}