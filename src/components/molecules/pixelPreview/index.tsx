import { PixelDraw, PixelDrawProps } from "@/components/atoms/pixelDraw"
import { IColorRGBA } from "@/models/ColorRBG"
import { getMatrixSize } from "@/models/Matrix"
import { IPixelMatrix } from "@/models/PixelMatrix"
import { IPoint } from "@/models/Point"
import { classnames } from "@/utils/classnames"
import { PixelGrid } from "../PixelGrid"
import styles from "./index.module.scss"



export interface PixelPreviewProps{
  matrix: IPixelMatrix,
  displayBorders?: boolean,
  borderColor?: IColorRGBA,
  PixelRender?:React.FC<PixelDrawProps>,
}

export const PixelPreview: React.FC<PixelPreviewProps> = ({
  matrix,
  displayBorders,
  borderColor,
  PixelRender
}) => {

  const matrixSize=getMatrixSize(matrix)
  const centerPoint:IPoint ={
    x: Math.floor(matrixSize.width / 2),
    y:  Math.floor(matrixSize.height / 2)
  }
  
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