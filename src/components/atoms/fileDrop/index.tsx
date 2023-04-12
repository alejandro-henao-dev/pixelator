import { classnames } from "@/utils/classnames";
import { PropsWithChildren, useState } from "react";
import styles from './index.module.scss'

export interface FileDropProps extends PropsWithChildren{
  accept?: string,
  onChange?:()=>void,
  onDragOver?:()=>void,
  onDrop?:()=>void
}
export const FileDrop: React.FC<any> = ({
  accept,
  className="",
  onChange=()=>{},
  children,
  onDragOver=()=>{},
  onDrop=()=>{}
}) => {

  const [dropping, setDropping] = useState(false)
  
  const onDropHandler = (e: any) => {
    
    e.preventDefault();
    setDropping(false)
    if (accept) {
      const valid = accept.split(",").some((type:string) => {
        return Array.from(e.dataTransfer.items).every((i: any) => {
          return i.type.match(new RegExp(type))
        })
      })
      
      if (!valid) {
        return
      }
    }
    
    onDrop()
    const files=e.dataTransfer.files
    const file = files[0]
    onChange(file,files)
  }

  return <div
    onDragOver={e => {
      e.preventDefault()
      onDragOver(e)
      setDropping(true)
    }}
    onMouseLeave={() => {
      if(dropping){
        setDropping(false)
      }
    }}
    onMouseUp={() => {
      if(dropping){
        setDropping(false)
      }
    }}
    onDrop={onDropHandler}
    className={classnames(className, dropping && styles.droping)}
  >
    {children}
  </div>
}