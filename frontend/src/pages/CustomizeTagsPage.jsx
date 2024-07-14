import React from 'react'
import { PageWrapper } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags, faXmark } from '@fortawesome/free-solid-svg-icons'

const tags=["Family","Friends","Entertainment","Food","Online","Custom","Shopping","Games"]

const CustomizeTagsPage = () => {
  return (
    <PageWrapper>
      <div className='flex w-[100%] md:flex-row flex-col gap-8 '>
        <AvailableTags />
        <AddNewTags />
      </div>
    </PageWrapper>
  )
}

function AvailableTags(){
  return(
    <div className='flex-1 flex flex-col gap-8'>
      <div className='flex gap-4 justify-center items-center text-[2rem] font-bold'>Tags <FontAwesomeIcon icon={faTags} /></div>
      <div className='flex flex-wrap gap-4'>
        {tags.map((tag,index)=>{
          return(
            <div key={index} className='flex items-center gap-4 rounded-xl text-purple-600 bg-purple-200 border-purple-600 border-2 font-semibold text-center'>
              <h3 className='p-2 px-4 text-[1.2rem]'>{tag}</h3> 
              <FontAwesomeIcon className='cursor-pointer p-4 rounded-r-xl bg-white' icon={faXmark} />
            </div> 
          )
        })}
      </div>
    </div>
  )
}

function AddNewTags(){
  return(
    <div className='flex-1 flex flex-col gap-8'>
      <div className='flex gap-4 justify-center items-center text-[2rem] font-bold'>Add New Tag<FontAwesomeIcon icon={faTag} /></div>
      <div className='flex flex-col gap-8 justify-center items-center'>
        <input type="text" placeholder='Enter Tag Name' className='min-w-[60%] p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
        <button className='min-w-[30%] px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>Add Tag</button>
      </div>
    </div>
  )
}

export default CustomizeTagsPage