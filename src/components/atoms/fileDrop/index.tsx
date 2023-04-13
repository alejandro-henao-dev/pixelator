import { classnames } from "@/utils/classnames";
import { PropsWithChildren, useState } from "react";
import styles from './index.module.scss'

export interface FileDropProps extends PropsWithChildren{
  accept?: string,
  onChange?:(files:File[],event:any) => void,
  onDragOver?:()=>void,
  onDrop?: () => void,
  keepBorders?:boolean
}
export const FileDrop: React.FC<any> = ({
  accept,
  className="",
  onChange=()=>{},
  children,
  onDragOver=()=>{},
  onDrop = () => { },
  keepBorders
}) => {

  const [dropping, setDropping] = useState(keepBorders)
  
  const onDropHandler = (e: any) => {
    
    e.preventDefault();
    !keepBorders && setDropping(false)
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
    const files=e.dataTransfer.files as File[]
    onChange(files,e)
  }

  return <div
    onDragOver={e => {
      e.preventDefault()
      onDragOver(e)
      !keepBorders && setDropping(true)
    }}
    onMouseLeave={() => {
      if(dropping){
        !keepBorders && setDropping(false)
      }
    }}
    onMouseUp={() => {
      if(dropping){
        !keepBorders && setDropping(false)
      }
    }}
    onDrop={onDropHandler}
    className={classnames(className, dropping && styles.droping)}
  >
    {children}
  </div>
}