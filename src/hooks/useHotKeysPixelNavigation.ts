import { HOTKEYS_SCOPES } from "@/constants/hotKeysScopes"
import { pixelNavigationErrorEvent } from "@/models/pixelNavigationErrorEvent"
import { useHotkeys } from "react-hotkeys-hook"
import { usePixelNavigationActions } from "./usePixelNavigationActions"

export const useHotKeysPixelNavigation = (
  onErr: pixelNavigationErrorEvent=()=>{}
): void => {
 
  const actions = usePixelNavigationActions(onErr)
  
  useHotkeys("up", () => actions.moveUp(), { scopes: HOTKEYS_SCOPES.pixelNavigation, preventDefault: true })
  useHotkeys("down", () => actions.moveDown(),{ scopes: HOTKEYS_SCOPES.pixelNavigation ,preventDefault: true})
  useHotkeys("left", () => actions.moveLeft(),{ scopes: HOTKEYS_SCOPES.pixelNavigation ,preventDefault: true})
  useHotkeys("right", () => actions.moveRight(),{ scopes: HOTKEYS_SCOPES.pixelNavigation ,preventDefault: true})
}