import React, { useCallback, useState } from "react";
import { Matrix } from "@/models/Matrix";
import { Pixel } from "@/models/Pixel";
import { Point } from "@/models/Point";
import styles from "./index.module.scss"
import { PixelDraw, PixelDrawProps } from "@/components/atoms/pixelDraw";
import { classnames } from "@/utils/classnames";
import { ColorRGBA } from "@/models/ColorRBG";

export interface PixelGridProps{
  pixels: Matrix<Pixel>,
  selected?: Point | null,
  displayBorders?: boolean,
  borderColor?: ColorRGBA,
  className?: string,
  pixelClassName?: string,
  selectedPixelClassName?: string,
  PixelRender?:React.FC<PixelDrawProps>,
  onPixelClick?: (point: Point) => void,
  onPixelMouseEnter?: (event: any, coords:Point) => void,
  onPixelMouseLeave?: (event: any, coords:Point) => void,
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  pixels,
  displayBorders,
  borderColor= new ColorRGBA(0,0,0),
  selected,
  pixelClassName,
  className,
  selectedPixelClassName,
  PixelRender,
  onPixelClick: onClick=()=>{},
  onPixelMouseEnter=() => { },
  onPixelMouseLeave = () => { },
  
}) => {

  const PixelComponent = useCallback((props:any) => {
    if (PixelRender) {
      return <PixelRender {...props}/>
    } else {
      return <PixelDraw {...props}/>
    }
  },[PixelRender])

  return <>
    <div className={classnames(styles.imgGrid, className)}>
    {pixels.cells.map((row, y) => {
      return <div className={styles.row} key={`row - ${y}`}>
        {row.map((pixel, x) => {
          const currentCoords=new Point(x, y)
          return <>
            <PixelComponent
              cssVars={{
                '--border-color':borderColor.getCssFormat()
              }}
              pixel={pixel}
              key={`${y} - ${x}`}
              className={classnames(
                styles.cell,
                pixelClassName,
                displayBorders && styles.borders,
                selected?.equalTo(currentCoords) && selectedPixelClassName
              )}
              onMouseEnter={(e:any)=>onPixelMouseEnter(e,currentCoords)}
              onMouseLeave={(e:any)=>onPixelMouseLeave(e,currentCoords)}
              onClick={()=>onClick(new Point(x, y))}
            />
          </>
        })}
      </div>
    })}
  </div>
  </>
}