import { classnames } from "@/utils/classnames";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import styles from './index.module.scss'


export enum INPUT_VARIANT{
  primary = "filled", // with a filled background
  secondary = "simple", // just with a bottom border
}


export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, PropsWithChildren{
  className?: string,
  variant?: INPUT_VARIANT,
  
}


export const Input: React.FC<InputProps> = ({
  className,
  variant = INPUT_VARIANT.primary,
  autoFocus,
  ...props
}) => {

  const inputRef:React.LegacyRef<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [autoFocus, inputRef]);



  return <input
    className={classnames(className, styles.inputBase, styles[variant])}
    ref={inputRef}
    {...props}
  />
  
}