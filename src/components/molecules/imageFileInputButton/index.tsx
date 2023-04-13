import { Button, ButtonProps, BUTTON_TYPES } from "@/components/atoms/button"
import { FileInputProps } from "@/components/atoms/fileInput"
import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from "react"
import { ImageFileInput } from "../imageFileInput"


export interface ImageFileInputButtonProps extends PropsWithChildren{
  buttonProps?: ButtonProps,
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  onChange?: (files?: File[],value?:string) => void,
}

export const ImageFileInputButton: React.FC<ImageFileInputButtonProps> = ({
  buttonProps = {},
  inputProps = {},
  onChange,
  children
}) => {
  
  return <ImageFileInput
    inputProps={inputProps}
    onChange={onChange}
    Container={({ children }) =>
      <Button type={BUTTON_TYPES.secondary} {...buttonProps}>
        {children}
      </Button>
    }
  >
    {children}
  </ImageFileInput>
}