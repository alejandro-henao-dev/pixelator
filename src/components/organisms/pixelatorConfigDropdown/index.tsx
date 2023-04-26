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

export interface PixelatorConfigDropdownProps{
  className?: string;
}

export const PixelatorConfigDropdown: React.FC<PixelatorConfigDropdownProps> = ({
  className
}) => {

  const active = useAppSelector(state => state.pixelatorMode.active)
  const config = useAppSelector(state => state.pixelatorMode.config)
  const dispatch = useDispatch()
  
  return <Dropdown label="Pixelator" >
    <div className={styles.container}>

      <header className={classnames(styles.header, className)} data-a="hola">
        <span>Pixelate mode:</span>
        <ToggleSwitch
          value={active}
          onChange={val => dispatch(pixelatorStateActions.setActive(val))}
        /> 
      </header>

      {active && <section>
        <div className={styles.field}>
          <Text as="label" weight={TEXT_WEIGHT.bold} size={TEXT_SIZE.small} relativeSize>Pixel Size</Text>
          <Input type="number" value={config.pixelSize} variant={INPUT_VARIANT.secondary} />
        </div>

        <Button block className={styles.generateButton} type={BUTTON_TYPES.secondary}> Generate </Button>
      </section>}
    </div>
  </Dropdown>
}