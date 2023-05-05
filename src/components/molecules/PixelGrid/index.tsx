import React, { useCallback, useState } from "react";
import { IPixel } from "@/models/Pixel";
import { IPoint, pointEqualTo, pointToString } from "@/models/Point";
import styles from "./index.module.scss"
import { PixelDraw, PixelDrawProps } from "@/components/atoms/pixelDraw";
import { classnames } from "@/utils/classnames";
import { getColorRGBACssFormat, IColorRGBA } from "@/models/ColorRBG";
import { IPixelMatrix } from "@/models/PixelMatrix";

export interface PixelGridProps{
  pixels: IPixelMatrix,
  selected?: IPoint | null,
  displayBorders?: boolean,
  borderColor?: IColorRGBA,
  className?: string,
  pixelClassName?: string,
  selectedPixelClassName?: string,
  PixelRender?:React.FC<PixelDrawProps>,
  onPixelClick?: (point: IPoint) => void,
  onPixelMouseEnter?: (event: any, coords:IPoint) => void,
  onPixelMouseLeave?: (event: any, coords:IPoint) => void,
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  pixels,
  displayBorders,
  borderColor= {r:0,g:0,b:0,a:1},
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
    {pixels.map((row:any, y:number) => {
      return <div className={styles.row} key={`row - ${y}`}>
        {row.map((pixel:any, x:number) => {
          const currentCoords:IPoint={x,y}
          return <>
            <PixelComponent
              cssVars={{
                '--border-color':getColorRGBACssFormat(borderColor)
              }}
              pixel={pixel}
              key={pointToString(currentCoords)}
              className={classnames(
                styles.cell,
                pixelClassName,
                displayBorders && styles.borders,
                selected && pointEqualTo(selected,currentCoords) && selectedPixelClassName
              )}
              onMouseEnter={(e:any)=>onPixelMouseEnter(e,currentCoords)}
              onMouseLeave={(e:any)=>onPixelMouseLeave(e,currentCoords)}
              onClick={()=>onClick(currentCoords)}
            />
          </>
        })}
      </div>
    })}
  </div>
  </>
}