import { classnames } from "@/utils/classnames";
import React from "react";
import styles from "./index.module.scss"


export enum BUTTON_TYPES{
  primary="primary",
  secondary = 'secondary',
  tertiary='tertiary'
}

interface Props extends React.PropsWithChildren{
  label?: string,
  type?: BUTTON_TYPES,
  onClick?: (e: any) => void,
  disabled?:boolean
  
}
export const Button: React.FC<Props> = ({
  children,
  type = BUTTON_TYPES.primary,
  onClick = () => { },
  disabled=false
}) => {
  
  return <button
    className={classnames([
      styles.button,
      styles[type]
    ])}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}