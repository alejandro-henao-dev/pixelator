import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProjectState{
  title:string
}


const initialState: ProjectState = {
  title:"Untitle Project"
}

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>)=>{
      state.title=action.payload
    }
  }
})

export const projectStateActions = ProjectSlice.actions

export default ProjectSlice.reducer