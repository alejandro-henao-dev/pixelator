import { Text } from "@/components/atoms/text"
import { Title } from "@/components/atoms/title"
import { PixelPreview } from "@/components/molecules/pixelPreview"
import { Popup, PopupProps } from "@/components/molecules/popup"
import { IColorRGBA } from "@/models/ColorRBG"
import { getMatrixCellSorounding } from "@/models/Matrix"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { classnames } from "@/utils/classnames"
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"
import { usePixelNavigationActions } from "@/hooks/usePixelNavigationActions"
import { useGesturePixelNavigation } from "@/hooks/useGesturePixelNavigation"
import { useDoubleClick } from "@/hooks/useDoubleClick"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { IPixel } from "@/models/Pixel"
import { IPixelMatrix } from "@/models/PixelMatrix"
import { pointToString } from "@/models/Point"

export interface PopupPixelPreview extends PopupProps{}

export const PopupPixelPreview:React.FC<PopupPixelPreview> = (props) => {
 
  const dispatch=useAppDispatch()
  const selectedPixelCoords = useAppSelector(store=>store.pixelatorMode.selectedCoords)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const donePixels=useAppSelector(store => store.pixelatorMode.donePixels)
  
  const [selectedSubgrid, setSelectedSubgrid] = useState<IPixelMatrix | null>(null)
  const [message, setMessage] = useState('')
  
  const navigationBindings = useGesturePixelNavigation(setMessage)
  const actions = usePixelNavigationActions(setMessage)
  
  useEffect(() => {
    if (!selectedPixelCoords || !pixels) {
      return
    }
    const emptyPixel:IPixel = {
      color: { r: 255, g: 255, b: 255, a: 0 },
      empty:true
    }
    const subgrid = getMatrixCellSorounding(pixels, selectedPixelCoords, {
      threshold:1,
      emptyCell:emptyPixel
    })
    setSelectedSubgrid(subgrid)
  }, [selectedPixelCoords, pixels])


  const toggleDonePixel = useCallback(() => {
    if (!selectedPixelCoords) {
      return
    }
    dispatch(pixelatorStateActions.toggleDonePixel(selectedPixelCoords))
  }, [selectedPixelCoords, dispatch])
  
  const doubleClickRefContainer=useRef(null)
  useDoubleClick(doubleClickRefContainer, () => {
    toggleDonePixel()
  })

  const borderColor:IColorRGBA={r:0,g:0,b:0,a:0.3}

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
       
        <div className={styles.title}>
          <Title>
            Coords:
            {' '}
            <Text as="span">
              X: {selectedPixelCoords.x + 1}
              {' - '}
              Y: {selectedPixelCoords.y + 1}
            </Text>
          </Title>

          <span
            onClick={toggleDonePixel}
            className={classnames(
              styles.doneIcon,
              donePixels[pointToString(selectedPixelCoords)] && styles.isDone
            )}
          >
            <CheckCircleOutlined />
          </span>
       </div>
      </header>


      
      <PixelPreview
        className={styles.pixelPreview}
        displayBorders
        borderColor={borderColor}
        matrix={selectedSubgrid}
      />

      <span 
        className={classnames(
          styles.closeIcon,
        )}
        onClick={props.onClose}
      >
        <CloseCircleOutlined />
      </span>
      
    </div>
  </Popup>

  : <></>
}