import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPoint, pointToString } from '@/models/Point'
import { IPixelMatrix } from '@/models/PixelMatrix'


interface PixelatorState {
  
  config: {
    pixelSize: number,
  },
  
  active:boolean,
  pixels?: IPixelMatrix,
  donePixels:Record<string,IPoint>
  generated: boolean,
  selectedCoords: IPoint | null,
  drawGridBorders:boolean
}

// Define the initial state using that type
const initialState: PixelatorState = {
  config: {
    pixelSize: 10,  
  },
  active:true,
  pixels: undefined,
  generated: false,
  selectedCoords: null,
  drawGridBorders: false,
  donePixels:{}
}

export const PixelatorSlice = createSlice({
  name: 'pixelator',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload
    },
    setPixelSize: (state, action: PayloadAction<number>) => {
      state.config.pixelSize=action.payload
    },

    setPixels: (state, action: PayloadAction<IPixelMatrix>) => {
      state.pixels = action.payload
      state.generated=true
    },

    setSelectedPixel: (state, action: PayloadAction<IPoint | null>) => {
      state.selectedCoords=action.payload
    },

    setDrawGridBorders: (state, action: PayloadAction<boolean>) => {
      state.drawGridBorders=action.payload
    },

    addDonePixel: (state, action: PayloadAction<IPoint>) => {
      state.donePixels = {
        ...state.donePixels,
        [pointToString(action.payload)]:action.payload
      }
    }
  },
})

export const pixelatorStateActions = PixelatorSlice.actions

export default PixelatorSlice.reducer