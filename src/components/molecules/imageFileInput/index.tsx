import { FileInput, FileInputProps } from "@/components/atoms/fileInput"
import { PropsWithChildren } from "react"



interface Props extends FileInputProps{

}

export const ImageFileInput: React.FC<Props> = ({
  children,
  inputProps,
  ...props
}) => {
  return <FileInput inputProps={{
    accept: ".jpg,.jpeg.png",
    ...inputProps
  }}
  {...props}
  >
    {children}
  </FileInput>
}