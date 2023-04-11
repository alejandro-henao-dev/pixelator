import { classnames } from "@/utils/classnames";
import React from "react";
import styles from "./index.module.scss"


enum ButtonTypes{
  primary,
  secondary
}
interface Props extends React.PropsWithChildren{
  label?: string,
  type?: ButtonTypes,
  onClick?: (e: any) => void,
  disabled?:boolean
  
}
export const Button: React.FC<Props> = ({
  children,
  type = ButtonTypes.primary,
  onClick = () => { },
  disabled=false
}) => {
  
  return <button
    className={classnames([
      styles.button,
      styles.primary
    ])}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}