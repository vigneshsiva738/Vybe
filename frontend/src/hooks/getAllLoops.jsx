import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setPostData } from '../redux/postSlice'
import { setLoopData } from '../redux/loopSlice'

function getAllLoops() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
   
  useEffect(()=>{
const fetchloops=async ()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/loop/getAll`,{withCredentials:true})
         dispatch(setLoopData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchloops()
  },[dispatch,userData])
}

export default getAllLoops
