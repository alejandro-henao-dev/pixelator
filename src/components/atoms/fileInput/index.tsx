import React, { DetailedHTMLProps, HTMLAttributes, LegacyRef, useRef } from "react"


export interface FileInputProps{
  onChange?: (files?: File, value?: string) => void,
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
    console.log("cjange")
    const files = e.target.files[0]
    const value=e.target.value
    onChange(files, value)
  }

  const onDropHandler = (e: any) => {
    
    e.preventDefault();
    const accepted = inputProps?.accept?.split(',') || []
    
    const accept = accepted.some(accept => {
      return Array.from(e.dataTransfer.items).every((i: any) => {
        return i.type.match(new RegExp(accept))
      })
    })
    
    if (!accept) {
      return
    }

    const files=e.dataTransfer.files
    const file = files[0]
    ref.current.files = files
    
    
    onDrop(e)
    
    
    const value=e.target.value
    onChange(file, value)
  }

  return <Container>
    <div onClick={() => ref?.current?.click()}
      onDragOver={e => {
        e.preventDefault()
        onDragOver(e)
        
      }}
      onDrop={onDropHandler}
    >
      <input hidden type='file' ref={ref} onInput={onChangeHandler} {...inputProps} />
        {children}
    </div>
  </Container>
}

