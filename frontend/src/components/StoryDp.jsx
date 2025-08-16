import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
function StoryDp({ProfileImage,userName,story}) {
const navigate=useNavigate()
const{ userData}=useSelector(state=>state.user)
const{ storyData,storyList}=useSelector(state=>state.story)
const [viewed,setViewed]=useState(false)
useEffect(()=>{
  if(story?.viewers?.some((viewer)=>
  viewer?._id?.toString()===userData._id.toString() || viewer?.toString()==userData._id.toString()
)){
  setViewed(true)
}else{
  setViewed(false)
}


},[story,userData,storyData,storyList])
const handleViewers=async ()=>{
  try {
    const result=await axios.get(`${serverUrl}/api/story/view/${story._id}`,{withCredentials:true})
    
  } catch (error) {
    console.log(error)
  }
}


const handleClick=()=>{
  if(!story && userName=="Your Story"){
    navigate("/upload")
  }else if(story && userName=="Your Story"){
      handleViewers()
    navigate(`/story/${userData?.userName}`)
 
  }else {
     handleViewers()
navigate(`/story/${userName}`)
  }
}
  return (
    <div className='flex flex-col w-[80px]'>
      <div className={`w-[80px] h-[80px] ${!story?null:!viewed?"bg-gradient-to-b  from-blue-500 to-blue-950":"bg-gradient-to-r from-gray-500 to-black-800"}  rounded-full flex items-center justify-center relative`}  onClick={handleClick}>
      <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>
          <img src={ProfileImage ||  dp} alt="" className='w-full object-cover'/>
          {!story && userName=="Your Story" && <div>
       <FiPlusCircle className='text-black absolute bottom-[8px] bg-white  right-[10px] rounded-full w-[22px] h-[22px]' />
            </div>}
               
      </div>
      </div>
      <div className='text-[14px] text-center truncate w-full text-white'>{userName}</div>
    </div>
  )
}

export default StoryDp