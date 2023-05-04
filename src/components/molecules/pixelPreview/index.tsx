import { PixelDraw } from "@/components/atoms/pixelDraw"
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
  originalSize:Size,
  matrix: PixelMatrix,
  coords: Point,
  onNext?: () => void,
  onPrev?:()=>void
  displayBorders?: boolean,
  borderColor?:ColorRGBA
}

export const PixelPreview: React.FC<PixelPreviewProps> = ({
  originalSize,
  matrix,
  coords,
  displayBorders,
  borderColor,
  onNext=()=>{},
  onPrev=()=>{}
}) => {

  const centerPoint = new Point(Math.floor(matrix.size.width / 2), Math.floor(matrix.size.height / 2))
  
  return < div className={styles.container}>
    <nav className={styles.nav}>
      <div className={styles.prev} onClick={onPrev}>{"<"}</div>
      <div className={styles.next} onClick={onNext}>{">"}</div>
    </nav>

    <header className={styles.header}>

      <Text as="span">X: {coords.x + 1} / {originalSize.width}</Text>
      {' - '}
      <Text as="span">Y: {coords.y + 1} / {originalSize.height}</Text>
    </header>

    

    {<PixelGrid
      displayBorders={displayBorders}
      borderColor={borderColor}
      selected={centerPoint}
      className={styles.gridContainer}
      selectedPixelClassName={styles.pixelCurrent}
      pixelClassName={styles.pixel}
      pixels={matrix}
    />}

  </div>
}