import { createSlice } from "@reduxjs/toolkit"
const storySlice=createSlice({
    name:"post",
    initialState:{
        storyData:null,
        storyList:null,
        currentUserStory:null
    },
    reducers:{
       setStoryData:(state,action)=>{
        state.storyData=action.payload
       } ,
         setStoryList:(state,action)=>{
        state.storyList=action.payload
       } 
       ,
        setCurrentUserStory:(state,action)=>{
        state.currentUserStory=action.payload
       } 
    }

})

export const {setStoryData,setStoryList,setCurrentUserStory}=storySlice.actions
export default storySlice.reducer