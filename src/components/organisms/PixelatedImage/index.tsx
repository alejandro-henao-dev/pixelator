import { PixelGrid } from "@/components/molecules/PixelGrid"
import { Point } from "@/models/Point"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { useEffect, useState } from "react"
import { PopupPixelPreview } from "../popupPixelPreview"


export const PixelatedImage: React.FC = () => { 

  const [popupOpen,setPopupOpen]=useState(false)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const active = useAppSelector(store => store.pixelatorMode.active)
  const selected = useAppSelector(store => store.pixelatorMode.selectedCoords)
  
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if (selected) {
      setPopupOpen(true)
    }
  },[selected])

  const onPixelMouseEnter = (e: any) => {
    e.target.style.scale = "1.3"
    e.target.style.zIndex = "2"
  }
  const onPixelMouseLeave = (e: any) => {
    e.target.style.scale = 'unset'
    e.target.style.zIndex = "0"
  }

  const onPixelClick = (point: Point) => {
    dispatch(pixelatorStateActions.setSelectedPixel(point))
    
  }


  const onPopupClose = () => {
    setPopupOpen(false)
    dispatch(pixelatorStateActions.setSelectedPixel(null))
  }

  return pixels && active ? <>
    <PixelGrid pixels={pixels}
    onPixelMouseEnter={onPixelMouseEnter}
    onPixelMouseLeave={onPixelMouseLeave}
    onPixelClick={onPixelClick}
    /> 

    { <PopupPixelPreview onClose={onPopupClose } />}
  
  </>: <></>
  

}