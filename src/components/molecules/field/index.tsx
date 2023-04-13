import { Input, InputProps } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { classnames } from "@/utils/classnames";
import { useCallback, useState } from "react";
import styles from "./index.module.scss"


export interface FieldProps extends InputProps{
  label?: string;
}

export const Field:React.FC<FieldProps> = ({
  label,
  className,
  ...props
}) => { 

  const [focused, setFocused] = useState(false)
  
  const onInputFocus = useCallback(() => {
    if (!focused) {
      setFocused(true)  
    }
  }, [focused])
  
  const onInputBlur = useCallback(() => {
    if (focused) {
      setFocused(false)  
    }
  },[focused])
  
  props = {
    ...props,
    onFocusCapture: (e) => {
      onInputFocus()
      if (props.onFocus) {
        props.onFocus(e)
      }
      
    },
    onBlurCapture: (e) => {
      onInputBlur()
      if (props.onBlur) {
        props.onBlur(e)
      }
    }
  }
  return <fieldset className={classnames(className,styles.fieldset)}>
    <Label active={focused}>{label}</Label>
    <Input {...props} />
  </fieldset>
}