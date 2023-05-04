import { PixelGrid } from "@/components/molecules/PixelGrid"
import { Point } from "@/models/Point"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { useEffect, useState } from "react"
import { PopupPixelPreview } from "../popupPixelPreview"
import styles from "./index.module.scss"

export const PixelatedImage: React.FC = () => { 

  const [popupOpen,setPopupOpen]=useState(false)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const active = useAppSelector(store => store.pixelatorMode.active)
  const selected = useAppSelector(store => store.pixelatorMode.selectedCoords)
  const drawGridBorders=useAppSelector(store=>store.pixelatorMode.drawGridBorders)
  
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if (selected) {
      setPopupOpen(true)
    }
  },[selected])


  const onPixelClick = (point: Point) => {
    dispatch(pixelatorStateActions.setSelectedPixel(point))
    
  }


  const onPopupClose = () => {
    setPopupOpen(false)
    // dispatch(pixelatorStateActions.setSelectedPixel(null))
  }

  return pixels && active ? <>
    <PixelGrid pixels={pixels}
      onPixelClick={onPixelClick}
      pixelClassName={styles.pixel}
      displayBorders={drawGridBorders}
      selectedPixelClassName={styles.selectedPixel}
      selected={selected}
    /> 

    {popupOpen &&  <PopupPixelPreview onClose={onPopupClose } />}
  
  </>: <></>
  

}