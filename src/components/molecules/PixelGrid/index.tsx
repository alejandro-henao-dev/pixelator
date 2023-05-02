import { useState } from "react";
import { Matrix } from "@/models/Matrix";
import { Pixel } from "@/models/Pixel";
import { Point } from "@/models/Point";
import styles from "./index.module.scss"
import { PixelDraw } from "@/components/atoms/pixelDraw";

export interface PixelGridProps{
  pixels: Matrix<Pixel>,
  selected?: Point,
  onPixelClick?: (point: Point) => void,
  onPixelMouseEnter?: (event: any) => void,
  onPixelMouseLeave?: (event: any) => void,
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  pixels,
  selected,
  onPixelClick: onClick=()=>{},
  onPixelMouseEnter=() => { },
  onPixelMouseLeave=()=>{}
}) => {

  return <>
    <div className={styles.imgGrid}>
    {pixels.cells.map((row, rowIndex) => {
      return <div className={styles.row} key={rowIndex}>
          {row.map((pixel, colIndex) => <PixelDraw
            pixel={pixel}
            key={`${rowIndex} - ${colIndex}`}
            className={styles.cell}
            onMouseEnter={onPixelMouseEnter}
            onMouseLeave={onPixelMouseLeave}
            onClick={()=>onClick(new Point(rowIndex, colIndex))}
          />)}
      </div>
    })}
  </div>
  </>
}