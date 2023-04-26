import { Text, TEXT_SIZE, TEXT_WEIGHT } from "@/components/atoms/text";
import { ToggleSwitch } from "@/components/atoms/toggleSwitch";
import { Dropdown } from "@/components/molecules/dropdown";
import { classnames } from "@/utils/classnames";
import styles from "./index.module.scss"
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { pixelatorStateActions } from "@/store/slices/pixelatorSlice";
import { Input, INPUT_VARIANT } from "@/components/atoms/input";
import { Button, BUTTON_TYPES } from "@/components/atoms/button";
import { ProjectTitleInput } from "../projectTitleInput";
import { Field } from "@/components/molecules/field";
import { projectStateActions } from "@/store/slices/projectSlice";

export interface ProjectConfigDropdownProps{
  className?: string;
}

export const ProjectConfigDropdown: React.FC<ProjectConfigDropdownProps> = ({
  className
}) => {

  const project = useAppSelector(state => state.project)
  const dispatch = useDispatch()
  
  return <Dropdown label="Project" >
    <div className={styles.container}>

      <section>
        <div className={styles.field}>
          <Text as="label"  weight={TEXT_WEIGHT.bold} size={TEXT_SIZE.small}  relativeSize>Project Name</Text>
          <Input 
             placeholder="Project Title"
             onInput={(e: any) => dispatch(projectStateActions.setTitle(e.target.value))}
            value={project.title}
            variant={INPUT_VARIANT.secondary}
          />

          <Button type={BUTTON_TYPES.secondary} block className={styles.button}>Save</Button>
        </div>

        
      </section>
    </div>
  </Dropdown>
}