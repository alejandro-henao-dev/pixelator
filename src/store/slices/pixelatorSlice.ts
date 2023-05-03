import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { Pixel } from '@/models/Pixel'
import { Matrix } from '@/models/Matrix'
import { type } from 'os'
import { Point } from '@/models/Point'
import { PixelMatrix } from '@/models/PixelMatrix'


interface PixelatorState {
  
  config: {
    pixelSize: number,
  },
  active:boolean,
  pixels?: PixelMatrix,
  generated: boolean,
  selectedCoords: Point | null
}

// Define the initial state using that type
const initialState: PixelatorState = {
  config: {
    pixelSize: 10,  
  },
  active:true,
  pixels: undefined,
  generated: false,
  selectedCoords:null
}

export const PixelatorSlice = createSlice({
  name: 'pixelator',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload
      if (!action.payload) {
        // state.generated = false
        // state.pixels=undefined  
      }
      
    },
    setPixelSize: (state, action: PayloadAction<number>) => {
      state.config.pixelSize=action.payload
    },

    setPixels: (state, action: PayloadAction<PixelMatrix>) => {
      state.pixels = action.payload
      state.generated=true
    },

    setSelectedPixel: (state, action: PayloadAction<Point | null>) => {
      state.selectedCoords=action.payload
    }
  },
})

export const pixelatorStateActions = PixelatorSlice.actions

export default PixelatorSlice.reducer