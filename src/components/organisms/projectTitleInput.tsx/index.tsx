import { Input, InputProps } from "@/components/atoms/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { projectStateActions } from "@/store/slices/projectSlice";


export interface ProjectTitleInputProps extends InputProps{
  usePlaceholder?:boolean,
  placeholder?:string,
}

export const ProjectTitleInput: React.FC<ProjectTitleInputProps> = ({
  usePlaceholder,
  placeholder="Project Title",
  ...props
}) => {
  
  const title = useAppSelector(state => state.project.title)
  const dispatch = useAppDispatch()

  return <Input
    placeholder={usePlaceholder ? placeholder : undefined}
    onInput={(e: any) => dispatch(projectStateActions.setTitle(e.target.value))}
    value={title}
    {...props}
  />
}