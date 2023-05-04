import { Text } from "@/components/atoms/text"
import { PixelPreview } from "@/components/molecules/pixelPreview"
import { Popup, PopupProps } from "@/components/molecules/popup"
import { ColorRGBA } from "@/models/ColorRBG"
import { Matrix } from "@/models/Matrix"
import { Pixel } from "@/models/Pixel"
import { PixelMatrix } from "@/models/PixelMatrix"
import { Point } from "@/models/Point"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { useEffect, useState } from "react"

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

  const onNext = () => {
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

  const onPrev = () => {
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

  return selectedSubgrid && selectedPixelCoords && pixels ? <Popup {...props}>
    <PixelPreview
      displayBorders
      borderColor={new ColorRGBA(0,0,0,0.3)}
      originalSize={pixels?.size}
      matrix={selectedSubgrid}
      coords={selectedPixelCoords}
      onNext={onNext}
      onPrev={onPrev}
    />

    <Text>
      {message}
    </Text>
  </Popup>

  : <></>
}