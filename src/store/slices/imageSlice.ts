import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'


interface ImageState {
  blob?: Blob
  url?:string
}

const initialState: ImageState = {
  blob: undefined,
  url: undefined
}

export const ImageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setFromBlob: (state, action: PayloadAction<Blob>) => {
      if (state.url) {
        URL.revokeObjectURL(state.url)
      }

      state.blob = action.payload
      state.url=URL.createObjectURL(action.payload)
    },

    setFromUrl: (state, action:PayloadAction<string>) => {
      ( async ()=> {
       try {
        const res = await fetch(action.payload)
        const blob = await res.blob()
        state.blob=blob
        state.url = action.payload
       } catch (error) {
        
       }
      })()
    },
  },
})

export const imageStateActions = ImageSlice.actions

export default ImageSlice.reducer