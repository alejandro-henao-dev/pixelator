import { PixelDraw, PixelDrawProps } from "@/components/atoms/pixelDraw"
import { Text } from "@/components/atoms/text"
import { ColorRGBA } from "@/models/ColorRBG"
import { Matrix } from "@/models/Matrix"
import { Pixel } from "@/models/Pixel"
import { PixelMatrix } from "@/models/PixelMatrix"
import { Point } from "@/models/Point"
import { Size } from "@/models/Size"
import { classnames } from "@/utils/classnames"
import { PixelGrid } from "../PixelGrid"
import styles from "./index.module.scss"



export interface PixelPreviewProps{
  matrix: PixelMatrix,
  displayBorders?: boolean,
  borderColor?: ColorRGBA,
  PixelRender?:React.FC<PixelDrawProps>,
}

export const PixelPreview: React.FC<PixelPreviewProps> = ({
  matrix,
  displayBorders,
  borderColor,
  PixelRender
}) => {

  const centerPoint = new Point(Math.floor(matrix.size.width / 2), Math.floor(matrix.size.height / 2))
  
  return < div className={styles.container}>
    {<PixelGrid
      displayBorders={displayBorders}
      borderColor={borderColor}
      selected={centerPoint}
      className={styles.gridContainer}
      selectedPixelClassName={styles.pixelCurrent}
      pixelClassName={styles.pixel}
      pixels={matrix}
      PixelRender={PixelRender}
    />}

  </div>
}