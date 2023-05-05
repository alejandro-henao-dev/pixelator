import { Text } from "@/components/atoms/text"
import { Title } from "@/components/atoms/title"
import { PixelPreview } from "@/components/molecules/pixelPreview"
import { Popup, PopupProps } from "@/components/molecules/popup"
import { ColorRGBA } from "@/models/ColorRBG"
import { Matrix } from "@/models/Matrix"
import { Pixel } from "@/models/Pixel"
import { PixelMatrix } from "@/models/PixelMatrix"
import { Point } from "@/models/Point"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { classnames } from "@/utils/classnames"
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"
import { usePixelNavigationActions } from "@/hooks/usePixelNavigationActions"
import { useGesturePixelNavigation } from "@/hooks/useGesturePixelNavigation"
import { useDoubleClick } from "@/hooks/useDoubleClick"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"

export interface PopupPixelPreview extends PopupProps{}

export const PopupPixelPreview:React.FC<PopupPixelPreview> = (props) => {
 
  const dispatch=useAppDispatch()
  const selectedPixelCoords = useAppSelector(store=>store.pixelatorMode.selectedCoords)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  
  
  const [selectedSubgrid, setSelectedSubgrid] = useState<PixelMatrix | null>(null)
  const [message, setMessage] = useState('')
  
  const navigationBindings = useGesturePixelNavigation(setMessage)
  const actions = usePixelNavigationActions(setMessage)
  
  useEffect(() => {
    if (!selectedPixelCoords || !pixels) {
      return
    }
    const subgrid = pixels.getSoroundingMatrix(selectedPixelCoords)
    setSelectedSubgrid(subgrid)
  }, [selectedPixelCoords, pixels])


  const doubleClickRefContainer=useRef(null)
  useDoubleClick(doubleClickRefContainer, () => {
    if (!selectedPixelCoords) {
      return
    }
    dispatch(pixelatorStateActions.addDonePixel(selectedPixelCoords))
  })

  return selectedSubgrid && selectedPixelCoords && pixels ? <Popup {...props}>
    <div className={styles.container} {...navigationBindings}
      ref={doubleClickRefContainer}
    >

      <nav className={styles.nav}>
        <div className={styles.up} onClick={actions.moveUp}>
          <CaretUpOutlined />
        </div>
        <div className={styles.down} onClick={actions.moveDown}>
          <CaretDownOutlined />
        </div>
        <div className={styles.left} onClick={actions.moveLeft}>
          <CaretLeftOutlined />
        </div>
        <div className={styles.right} onClick={actions.moveRight}>
          <CaretRightOutlined />
        </div>
      </nav>

      <header className={styles.header}>
        <Title>
          Coords:
          {' '}
          <Text as="span">
            X: {selectedPixelCoords.x + 1} / {pixels.size.width}
            {' - '}
            Y: {selectedPixelCoords.y + 1} / {pixels.size.height}
          </Text>
        </Title>

        <span className={classnames(
          styles.doneIcon,
          // styles.isDone
        )}>
          <CheckCircleOutlined />
        </span>
      </header>


      <PixelPreview
        displayBorders
        borderColor={new ColorRGBA(0,0,0,0.3)}
        matrix={selectedSubgrid}
      />

      <Text>
        {message}
      </Text>
      
    </div>
  </Popup>

  : <></>
}