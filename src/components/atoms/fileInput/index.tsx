import React, { DetailedHTMLProps, HTMLAttributes, LegacyRef, useRef } from "react"


interface Props{
  Container:React.FC<React.PropsWithChildren>,
  onChange?: (files?: File,value?:string) => void,
  as?:  string,
  children?: React.ReactNode,
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  

}

export const FileInput: React.FC<Props> = ({
  Container = (props) => <>{ props.children }</>,
  onChange = () => { },
  children,
  inputProps,
  ...props
}) => {
  
  const ref:any = useRef()
  

  const onChangeHandler = (e:any) => { 
    const files = e.target.files[0]
    const value=e.target.value
    onChange(files, value)
  }

  return <Container>
    <div onClick={() => ref?.current?.click()}>
      <input hidden type='file' ref={ref} onInput={onChangeHandler} {...inputProps} />
        {children}
    </div>
  </Container>
}
