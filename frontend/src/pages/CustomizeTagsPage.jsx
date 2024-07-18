import { useState } from 'react'
import {useSelector} from "react-redux"
import { PageWrapper,SideBar } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags, faXmark, faPen, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

const CustomizeTagsPage = () => {
  const [deleteClicked,setDeleteClicked] = useState(false)
  const [updateClicked,setUpdateClicked] =useState(false)
  const [addClicked,setAddClicked] = useState(false)
  const [tagName,setTagName] =useState("")
  const tags=useSelector(state=>state.tags)

  return (
    <div className="flex">
      <SideBar />
      <PageWrapper>
        <div className={`flex w-[100%] flex-wrap flex-col gap-8 `}>
          <div className='absolute top-[40%] left-[40%]'>
            <DeleteTagModal setDeleteClicked={setDeleteClicked} deleteClicked={deleteClicked} tagName={tagName} />
            <AddNewTags addClicked={addClicked}/>
            <UpdateTag tag={tagName} updateClicked={updateClicked} />
          </div>
          <AvailableTags setDeleteClicked={setDeleteClicked} setTagName={setTagName} tags={tags} setUpdateClicked={setUpdateClicked}/>
          <div className='flex justify-end text-[4rem]'>
            <FontAwesomeIcon onClick={()=>setAddClicked(!addClicked)} className=" text-purple-600 p-1 rounded-xl" icon={faSquarePlus} />
          </div>
          {/* <div className='flex flex-col gap-8'>
            <AddNewTags />
            <UpdateTag tags={tags}/>
          </div> */}
        </div>
      </PageWrapper>
    </div>
  )
}

function AvailableTags({setDeleteClicked,setTagName,tags,setUpdateClicked}){
  return(
    <div className='flex-1 flex flex-col gap-8 p-4'>
      <div className='flex gap-4 justify-center items-center text-[2rem] font-bold'>Tags <FontAwesomeIcon icon={faTags} /></div>
      <div className='flex flex-wrap gap-4'>
        {tags.map((tag,index)=>{
          return(
            <div key={index} className='flex items-center rounded-xl text-purple-600 bg-purple-200 border-purple-600 border-2 font-semibold text-center'>
              <h3 className='p-1 px-4 text-[1.2rem]'>{tag}</h3> 
              <div  onClick={()=>{
                setUpdateClicked(true)
                setTagName(tag)
              }} className='cursor-pointer p-2 text-[1.3rem] px-4 rounded-l-xl border-r-purple-600 bg-white'>
              <FontAwesomeIcon icon={faPen} />
              </div>
              <div  onClick={()=>{
                setDeleteClicked(true)
                setTagName(tag)
              }} className='cursor-pointer p-2 text-[1.3rem] px-4 rounded-r-xl border-l-purple-600 bg-white'>
              <FontAwesomeIcon icon={faXmark} />
              </div>
            </div> 
          )
        })}
      </div>
    </div>
  )
}

function AddNewTags({addClicked}){
  return(
    <div>
      {addClicked && <div className='flex-1 flex flex-col gap-8 rounded-md shadow bg-white p-4'>
        <div className='flex gap-4 justify-center items-center text-[2rem] font-bold'>Add New Tag<FontAwesomeIcon icon={faTag} /></div>
        <div className='flex flex-col gap-8 justify-center items-center'>
          <input type="text" placeholder='Enter Tag Name' className='min-w-[60%] p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
          <button className='min-w-[30%] px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>Add Tag</button>
        </div>
      </div>}
    </div>
  )
}

function UpdateTag({updateClicked,tag}){
  return (
    <div>
      {updateClicked && <div className='flex-1 flex flex-col gap-8 rounded-md shadow bg-white p-4'>
      <div className='flex gap-4 justify-center items-center text-[2rem] font-bold'>Update Tag - {tag}<FontAwesomeIcon icon={faTag} /></div>
      <div className='flex flex-col gap-8 justify-center items-center'>
        <input type="text"  placeholder='Enter Tag Name' className='min-w-[60%] p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
        <button className='min-w-[30%] px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>Update Tag</button>
      </div>
    </div>}
    </div>
  )
}

function DeleteTagModal({setDeleteClicked,deleteClicked,tagName}){
  return(
    <div>
      {deleteClicked && 
      <div className='bg-white p-4 rounded shadow flex flex-col justify-center items-center gap-4'>
       <h3>Delete {tagName}?</h3>
       <div className='flex gap-4'>
        <button onClick={()=>setDeleteClicked(false)} className='rounded border-purple-600 bg-purple-200 border-2 px-2 py-1'>Cancel</button>
        <button className='rounded border-purple-600 bg-purple-200 border-2 px-2 py-1'>Yes!</button>
       </div>
      </div>}
    </div>
  )
}

export default CustomizeTagsPage