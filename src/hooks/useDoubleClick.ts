import { MouseEventHandler, MutableRefObject, useCallback, useEffect, useRef } from "react";

export function useDoubleClick<T>(
  ref: MutableRefObject<T | any>,
  callback: (e: any) => void,
) {
  

  const handler = useCallback((event: any) => {
      if (event.detail === 2) {
        callback(event)
      }
  },[callback])


  useEffect(() => {
    if (!ref?.current) {
      return
    }
    const target = ref.current
    
    target.addEventListener("click",handler)

    return ()=>target.removeEventListener("click",handler)
  },[ref,handler])
  
}