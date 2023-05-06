import { PixelDraw } from "@/components/atoms/pixelDraw"
import { PixelGrid } from "@/components/molecules/PixelGrid"
import { useHotKeysPixelNavigation } from "@/hooks/useHotKeysPixelNavigation"
import { IPoint, pointToString } from "@/models/Point"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"
import { classnames } from "@/utils/classnames"
import { useEffect, useState } from "react"
import { PopupPixelPreview } from "../popupPixelPreview"
import styles from "./index.module.scss"

export const PixelatedImage: React.FC = () => { 

  const [popupOpen,setPopupOpen]=useState(false)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const donePixels = useAppSelector(store => store.pixelatorMode.donePixels)
  const active = useAppSelector(store => store.pixelatorMode.active)
  const selected = useAppSelector(store => store.pixelatorMode.selectedCoords)
  const drawGridBorders=useAppSelector(store=>store.pixelatorMode.drawGridBorders)
  
  const dispatch = useAppDispatch()
  useHotKeysPixelNavigation()

  useEffect(() => {
    if (selected) {
      setPopupOpen(true)
    }
  },[selected])


  const onPixelClick = (point: IPoint) => {
    dispatch(pixelatorStateActions.setSelectedPixel(point))
  }


  const onPopupClose = () => {
    setPopupOpen(false)
  }

  return pixels && active ? <>
    <PixelGrid pixels={pixels}
      onPixelClick={onPixelClick}
      pixelClassName={styles.pixel}
      displayBorders={drawGridBorders}
      selectedPixelClassName={styles.selectedPixel}
      selected={selected}

      PixelRender={props => {
        const active=props.pixel.coords
        ? !Boolean(donePixels[pointToString(props.pixel.coords)])
          : true
        return  <PixelDraw
        {...props}
        active={active}
      />
      }}
    /> 

    {popupOpen &&  <PopupPixelPreview onClose={onPopupClose } />}
  
  </>: <></>
  

}