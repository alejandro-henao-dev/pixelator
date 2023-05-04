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
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { classnames } from "@/utils/classnames"
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import styles from "./index.module.scss"

const ERROR_MSG = {
  noError:"",
  notPrev: "There are no more pixes before this one",
  notNext:"There are no more pixes before this one"
}

export interface PopupPixelPreview extends PopupProps{}

export const PopupPixelPreview:React.FC<PopupPixelPreview> = (props) => {
 
  const dispatch=useAppDispatch()
  const selectedPixelCoords = useAppSelector(store=>store.pixelatorMode.selectedCoords)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  
  
  const [selectedSubgrid, setSelectedSubgrid] = useState<PixelMatrix | null>(null)
  const [message, setMessage]=useState('')
  
  useEffect(() => {
    if (!selectedPixelCoords || !pixels) {
      return
    }
    const subgrid = pixels.getSoroundingMatrix(selectedPixelCoords)
    setSelectedSubgrid(subgrid)
  }, [selectedPixelCoords, pixels])

  const onRight = () => {
    if (!selectedPixelCoords || !pixels) {
      return
    }    
    if (selectedPixelCoords.x + 1 < pixels.size.width) {
      setMessage(ERROR_MSG.noError)
      const newCoords = new Point(selectedPixelCoords.x + 1, selectedPixelCoords.y)
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))  
      
    } else {
      setMessage(ERROR_MSG.notPrev)
      
    }
  }

  const onLeft = () => {
    if (!selectedPixelCoords || !pixels) {
      return
    }    
    if (selectedPixelCoords.x - 1 >= 0) {
      setMessage(ERROR_MSG.noError)
      const newCoords = new Point(selectedPixelCoords.x - 1, selectedPixelCoords.y)
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))
      
    } else {
      setMessage(ERROR_MSG.notPrev)
    }
  }

  const onUp = () => {
    if (!selectedPixelCoords || !pixels) {
      return
    }    
    if (selectedPixelCoords.y - 1 >= 0) {
      setMessage(ERROR_MSG.noError)
      const newCoords = new Point(selectedPixelCoords.x, selectedPixelCoords.y - 1)
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))
      
    } else {
      setMessage(ERROR_MSG.notPrev)
    }
  }

  const onDown = () => {
    if (!selectedPixelCoords || !pixels) {
      return
    }    
    if (selectedPixelCoords.y + 1 < pixels.size.height) {
      setMessage(ERROR_MSG.noError)
      const newCoords = new Point(selectedPixelCoords.x, selectedPixelCoords.y + 1)
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))  
      
    } else {
      setMessage(ERROR_MSG.notPrev)
    }
  }

  return selectedSubgrid && selectedPixelCoords && pixels ? <Popup {...props}>
    <div className={styles.container}>

      <nav className={styles.nav}>
        <div className={styles.up} onClick={onUp}><CaretUpOutlined /></div>
        <div className={styles.down} onClick={onDown}><CaretDownOutlined /></div>
        <div className={styles.left} onClick={onLeft}><CaretLeftOutlined /></div>
        <div className={styles.right} onClick={onRight}><CaretRightOutlined /></div>
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