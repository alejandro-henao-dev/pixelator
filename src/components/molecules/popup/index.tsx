import { Overlay } from "@/components/atoms/overlay"

import { PropsWithChildren, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styles from "./index.module.scss"

export interface PopupProps extends PropsWithChildren{
  onClose?: () => void
  onOpen?:()=>void
}

export const Popup: React.FC<PopupProps> = ({
  onOpen = () => { },
  onClose=()=>{},
  children
}) => {

  const contentRef = useRef(null)
  const overlayRef=useRef(null)
  
  useEffect(() => {
    onOpen()
  }, [onOpen])
  

  if (!document) {
    return <></>
  }
  const target = document.querySelector("#popup")
  
  const onOverlayClick = (e: any) => {
    
    if (e.target?.contains(contentRef.current)) {
      onClose()
    }
    
    

  }
  
  return target && createPortal(<Overlay onClick={onOverlayClick} >
      <article className={styles.card} ref={contentRef}>
        {children}
      </article>
    </Overlay>,
    target
  )
}

