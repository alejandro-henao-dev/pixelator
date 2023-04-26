import { configureStore } from '@reduxjs/toolkit'
import ImageReducer from './slices/imageSlice'
import projectReducer from './slices/projectSlice'
import pixelatorReducer from './slices/pixelatorSlice'

export const store = configureStore({
  reducer: {
    image: ImageReducer,
    project: projectReducer,
    pixelatorMode: pixelatorReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
