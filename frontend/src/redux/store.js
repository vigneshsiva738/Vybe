import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import postSlice from "./postSlice"
import storySlice from "./storySlice"
import loopSlice from "./loopSlice"
import messageSlice from "./messageSlice"
import socketSlice from "./socketSlice"
const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        story: storySlice,
        loop: loopSlice,
        message:messageSlice,
        socket:socketSlice
    }
})

export default store