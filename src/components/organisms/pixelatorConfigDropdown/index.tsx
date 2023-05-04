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
import { Pixelator } from "@/tools/pixelator";

import dynamic from 'next/dynamic'

// const Pixelator = dynamic(() => {
//   return import("../../../tools/pixelator").then((mod) => mod.Pixelator)
// }, {
//   ssr: false,
// })

export interface PixelatorConfigDropdownProps{
  className?: string;
}

export const PixelatorConfigDropdown: React.FC<PixelatorConfigDropdownProps> = ({
  className
}) => {

  const active = useAppSelector(state => state.pixelatorMode.active)
  const config = useAppSelector(state => state.pixelatorMode.config)
  const pixels = useAppSelector(state => state.pixelatorMode.pixels)
  const imageURL = useAppSelector(state => state.image.url)
  const drawGridBorders=useAppSelector(state => state.pixelatorMode.drawGridBorders)

  const dispatch = useDispatch()
  

  const onGenerate = async () => {
    
    if (!imageURL) {
      return
    }
    const pixelator = new Pixelator(imageURL)

    const pixelMatrix = await pixelator.pixelate(config.pixelSize)
    dispatch(pixelatorStateActions.setPixels(pixelMatrix))
  }
  
  return <Dropdown label="Pixelator" >
    <div className={styles.container}>

      <header className={classnames(styles.header, className)} data-a="hola">
        <span>Pixelate mode:</span>
        <ToggleSwitch
          value={active}
          onChange={val => dispatch(pixelatorStateActions.setActive(val))}
        /> 
      </header>

      {active && <>
        <section>
          <div className={styles.field}>
            <Text as="label" weight={TEXT_WEIGHT.bold} size={TEXT_SIZE.small} relativeSize>Pixel Size</Text>
            <Input type="number" value={config.pixelSize} variant={INPUT_VARIANT.secondary} onInput={(e:any)=>dispatch(pixelatorStateActions.setPixelSize(parseInt(e.target.value)))} />
          </div>

          <Button block className={styles.generateButton} type={BUTTON_TYPES.secondary}
            disabled={!Boolean(imageURL)}
            onClick={onGenerate}
          >
            {pixels ? 'Regenerate' : 'Generate'}
          </Button>
        </section>
      </>}

      {active && imageURL && pixels && <>
        <section>
          <header>
            {/* <Text as="h3" size={TEXT_SIZE.small}>Grid Data </Text> */}
          </header>
          <br/>
          <ul>
            <li className={styles.field}>
              <Text as="label" weight={TEXT_WEIGHT.bold} size={TEXT_SIZE.small} relativeSize >Draw Pixel&apos;s Borders</Text>
              
              <span className={styles.fieldValue}>
                <ToggleSwitch  value={drawGridBorders} onChange={(val:boolean)=>dispatch(pixelatorStateActions.setDrawGridBorders(val))} />
              </span>
              
            </li>
            <li className={styles.field}>
              <Text as="label" weight={TEXT_WEIGHT.bold} size={TEXT_SIZE.small}
              relativeSize >Grid size: </Text>

              <Text as="span" size={TEXT_SIZE.small} className={styles.fieldValue}>
                {`W: ${pixels?.size.width} - H: ${pixels?.size.height}`}
              </Text>
            </li>
          </ul>

        </section>
      </>}
    </div>
  </Dropdown>
}