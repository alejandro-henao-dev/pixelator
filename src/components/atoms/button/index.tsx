import { classnames } from "@/utils/classnames";
import React from "react";
import styles from "./index.module.scss"


export enum BUTTON_TYPES{
  primary="primary",
  secondary = 'secondary',
  tertiary='tertiary'
}

export interface ButtonProps extends React.PropsWithChildren{
  label?: string,
  type?: BUTTON_TYPES,
  onClick?: (e: any) => void,
  disabled?: boolean,
  block?: boolean,
  className?:string
  
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type = BUTTON_TYPES.primary,
  onClick = () => { },
  disabled = false,
  block = false,
  className
}) => {
  
  return <button
    className={classnames(
      styles.button,
      styles[type],
      block && styles.block,
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}