import { classnames } from "@/utils/classnames";
import React, { PropsWithChildren } from "react";
import styles from './index.module.scss'


export enum INPUT_VARIANT{
  primary = "filled", // with a filled background
  secondary = "simple", // just with a bottom border
}


export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, PropsWithChildren{
  className?: string,
  variant?:INPUT_VARIANT
}


export const Input: React.FC<InputProps> = ({
  onChange,
  className,
  variant=INPUT_VARIANT.primary,
  ...props
}) => {

  

  return <input
    className={classnames(className,styles.inputBase, styles[variant])}
    {...props}
  />
  
}