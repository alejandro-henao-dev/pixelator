import { classnames } from "@/utils/classnames"
import { useEffect, useState } from "react"
import styles from "./index.module.scss"


export interface ToggleSwitchProps{
  initState?: boolean,
  value?: boolean,
  disabled?: boolean,
  onChange?:(val:boolean)=>void
}

export const ToggleSwitch:React.FC<ToggleSwitchProps>= ({
  initState=false,
  value,
  disabled,
  onChange
}) => {
  
  const [openState, setOpenState] = useState(value ?? initState)


  useEffect(() => {
    if (value !== null && value !== undefined) {
      setOpenState(value as boolean)  
    }
    
  }, [value])
  
  const onClick = (e:any) => {
    e.preventDefault()
    e.stopPropagation()
    if (value !== null && value !== undefined) { 
      console.log(value,"--")
      onChange && onChange(openState)
      return
    }
    setOpenState(prev=>!prev)
  }
  
  return <span
    className={classnames(
      styles.container,
      disabled && styles.disabled,
      openState && styles.on
    )}
    onClick={onClick}
  >
    <span className={ styles.handle}>

    </span>
  </span>
}