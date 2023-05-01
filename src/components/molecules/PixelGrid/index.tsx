import { useState } from "react";
import { Matrix } from "@/models/Matrix";
import { Pixel } from "@/models/Pixel";
import { Point } from "@/models/Point";
import styles from "./index.module.scss"

export interface PixelGridProps{
  pixels: Matrix<Pixel>,
  selected?: Point,
  onSelect?:(point:Point)=>void
}

export const PixelGrid: React.FC<PixelGridProps> = ({ pixels, selected }) => {
  console.log("griddd")

  return <>
    <div className={styles.imgGrid}>
    {pixels.cells.map((row, rowIndex) => {
      return <div className={styles.row} key={rowIndex}>
          {row.map((cell, indexCell) => <div
            style={{['--bg-color' as any]: `rgb(${cell.color.r},${cell.color.g},${cell.color.b})`}} 
            key={`${rowIndex} - ${indexCell}`}
            className={styles.cell}
          >
          </div>)}
      </div>
    })}
  </div>
  </>
}