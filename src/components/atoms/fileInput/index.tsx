import React, { DetailedHTMLProps, HTMLAttributes, LegacyRef, useRef } from "react"


export interface FileInputProps{
  onChange?: (files:File[],event:any) => void,
  onDragOver?: (e: any) => void,
  onDrop?: (e:any) => void,
  Container?:React.FC<React.PropsWithChildren>,
  children?: React.ReactNode,
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  

}

export const FileInput: React.FC<FileInputProps> = ({
  Container = (props) => <>{ props.children }</>,
  onChange = ()=>{},
  onDragOver= ()=>{},
  onDrop = ()=>{},
  children,
  inputProps,
  ...props
}) => {
  
  const ref:any = useRef()
  

  const onChangeHandler = (e: any) => { 
    onChange( e.target.files, e)
  }



  return <Container>
    <div onClick={() => ref?.current?.click()}>
      <input hidden type='file' ref={ref} onInput={onChangeHandler} {...inputProps} />
        {children}
    </div>
  </Container>
}

