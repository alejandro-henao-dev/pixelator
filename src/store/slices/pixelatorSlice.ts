import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

// Define a type for the slice state
interface PixelatorState {
  
}

// Define the initial state using that type
const initialState: PixelatorState = {
  
}

export const PixelatorSlice = createSlice({
  name: 'pixelator',
  initialState,
  reducers: {
    
  },
})

export const imageStateActions = PixelatorSlice.actions

export default PixelatorSlice.reducer