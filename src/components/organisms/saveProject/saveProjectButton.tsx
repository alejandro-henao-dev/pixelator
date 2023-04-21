import { Button, ButtonProps } from "@/components/atoms/button"


export interface SaveProjectButtonProps extends ButtonProps{

}
export const SaveProjectButton:React.FC<SaveProjectButtonProps> = ({
  children, ...props
}) => {
  return <Button {...props}>
    {children ?? 'Save'}  
  </Button>
}