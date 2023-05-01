import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { Pixel } from '@/models/Pixel'
import { Matrix } from '@/models/Matrix'

interface PixelatorState {
  
  config: {
    pixelSize: number,
  },
  active:boolean,
  pixels?: Matrix<Pixel>,
  generated: boolean
}

// Define the initial state using that type
const initialState: PixelatorState = {
  config: {
    pixelSize: 10,  
  },
  active:false,
  pixels: undefined,
  generated: false
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

    setPixels: (state, action: PayloadAction<Matrix<Pixel>>) => {
      state.pixels = action.payload
      state.generated=true
    }
  },
})

export const pixelatorStateActions = PixelatorSlice.actions

export default PixelatorSlice.reducer