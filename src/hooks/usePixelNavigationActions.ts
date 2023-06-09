import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice"

import { PIXEL_NAVIGATION_ERRORR } from "@/constants/pixelNavigationErrors"
import { useCallback } from "react"
import { IPoint } from "@/models/Point"
import { pixelNavigationErrorEvent } from "@/models/pixelNavigationErrorEvent"

export const usePixelNavigationActions = (
  onError: pixelNavigationErrorEvent= ()=>{}
) => {
  const dispatch=useAppDispatch()
  const selectedPixelCoords = useAppSelector(store => store.pixelatorMode.selectedCoords)
  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const matrixSize=useAppSelector(store => store.pixelatorMode.matrixSize)

  const moveRight = useCallback(() => {
    if (!selectedPixelCoords || !pixels || !matrixSize) {
      return
    }    
    if (selectedPixelCoords.x + 1 < matrixSize.width) {
      onError(PIXEL_NAVIGATION_ERRORR.noError)
      const newCoords:IPoint = {
        x: selectedPixelCoords.x + 1,
        y: selectedPixelCoords.y
      }
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))  
      
    } else {
      onError(PIXEL_NAVIGATION_ERRORR.notPrev)
      
    }
  },[dispatch,onError,pixels,selectedPixelCoords, matrixSize])

  const moveLeft = useCallback(() => {
    if (!selectedPixelCoords || !pixels || !matrixSize) {
      return
    }    
    if (selectedPixelCoords.x - 1 >= 0) {
      onError(PIXEL_NAVIGATION_ERRORR.noError)
      const newCoords: IPoint ={
        x: selectedPixelCoords.x - 1,
        y: selectedPixelCoords.y
      }
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))
      
    } else {
      onError(PIXEL_NAVIGATION_ERRORR.notPrev)
    }
  },[dispatch,onError,pixels,selectedPixelCoords, matrixSize])

  const moveUp = useCallback(() => {
    if (!selectedPixelCoords || !pixels || !matrixSize) {
      return
    }    
    if (selectedPixelCoords.y - 1 >= 0) {
      onError(PIXEL_NAVIGATION_ERRORR.noError)
      const newCoords:IPoint ={
        x: selectedPixelCoords.x,
        y: selectedPixelCoords.y - 1
      }

      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))
      
    } else {
      onError(PIXEL_NAVIGATION_ERRORR.notPrev)
    }
  },[dispatch,onError,pixels,selectedPixelCoords, matrixSize])

  const moveDown = useCallback(() => {
    if (!selectedPixelCoords || !pixels || !matrixSize) {
      return
    }    
    if (selectedPixelCoords.y + 1 < matrixSize.height) {
      onError(PIXEL_NAVIGATION_ERRORR.noError)
      const newCoords: IPoint = {
        x: selectedPixelCoords.x ,
        y: selectedPixelCoords.y + 1
      }
      dispatch(pixelatorStateActions.setSelectedPixel(newCoords))  
      
    } else {
      onError(PIXEL_NAVIGATION_ERRORR.notPrev)
    }
  }, [dispatch, onError, pixels, selectedPixelCoords, matrixSize])
  

  return {
    moveUp,moveDown, moveRight, moveLeft
  }

}