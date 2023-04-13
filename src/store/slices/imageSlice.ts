import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { blobToBase64 } from '@/utils/blobToBase64'


interface ImageState {
  status: "idle" | "pending" | 'fulfilled' | 'error',
  error?: string,
  base64?: string
  url?:string
}

const initialState: ImageState = {
  status: "idle",
  error:undefined,
  base64: undefined,
  url: undefined
}

const buildImageStateFromBlob = createAsyncThunk('image/buildFromBlob',async (blob:Blob) => {
  const base64 = await blobToBase64(blob)
  const url= URL.createObjectURL(blob)
  return {
    base64,
    url
  }
})

const buildImageStateFromUrl=createAsyncThunk('image/buildFromUrl', async (url:string)=> {
   const res = await fetch(url)
   const blob = await res.blob()
  return {
    base64: await blobToBase64(blob),
    url
  }
})
 
export const ImageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(buildImageStateFromUrl.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.url = action.payload.url
      state.base64=action.payload.base64
    })
    builder.addCase(buildImageStateFromUrl.pending, (state, action) => {
      state.status = 'pending'
      state.error=undefined
    }),
    builder.addCase(buildImageStateFromUrl.rejected, (state, action) => {
      state.status = 'error'
      state.error=action.error.message
    }),
    builder.addCase(buildImageStateFromBlob.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.url = action.payload.url
      state.base64=action.payload.base64
    })
    builder.addCase(buildImageStateFromBlob.pending, (state, action) => {
      state.status = 'pending'
      state.error=undefined
    }),
    builder.addCase(buildImageStateFromBlob.rejected, (state, action) => {
      state.status = 'error'
      state.error=action.error.message
    })
  }
})

export const imageStateActions = {
  ...ImageSlice.actions,
  buildImageStateFromBlob,
  buildImageStateFromUrl
}

export default ImageSlice.reducer