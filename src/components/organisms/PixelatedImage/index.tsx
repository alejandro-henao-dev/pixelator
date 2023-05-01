import { PixelGrid } from "@/components/molecules/PixelGrid"
import { useAppSelector } from "@/store/hooks"


export const PixelatedImage: React.FC = () => { 

  const pixels = useAppSelector(store => store.pixelatorMode.pixels)
  const active=useAppSelector(store => store.pixelatorMode.active)

  return pixels && active ? <PixelGrid pixels={pixels} /> : <></>
  

}