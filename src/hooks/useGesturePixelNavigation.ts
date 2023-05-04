import { pixelNavigationErrorEvent } from "@/models/pixelNavigationErrorEvent"
import { useDrag } from "@use-gesture/react"
import { usePixelNavigationActions } from "./usePixelNavigationActions"

export const useGesturePixelNavigation = (
  onErr: pixelNavigationErrorEvent=()=>{}
) => {
  const actions = usePixelNavigationActions(onErr)
  

  const gestureBind = useDrag((state) => {
    const { down, direction } = state

    const [x, y] = direction
    if (down) {
      return
    }
    if (x == 1) {
      actions.moveLeft()
      return
    }
    if (x == -1) {
      actions.moveRight()
      return
    }
    if (y == 1) {
      actions.moveUp()
      return
    }
    if (y == -1) {
      actions.moveDown()
      return
    }
  }, {
    threshold:20
  })

  return gestureBind()
}