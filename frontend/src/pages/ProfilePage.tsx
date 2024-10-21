import { 
    Button, 
    H1, 
    H3,
 } from '../components/ui'
import { Layout, Loader } from '../components'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../backendURL'
import {  Edit2 } from 'lucide-react'

interface UserDataFields{
  name:string,
  email:string,
  imgURL:string,
  isChild:boolean,
  parentConnectionStatus:boolean
}

const ProfilePage = () => {

    const[userData,setUserData]=useState<UserDataFields>()
    const [isFetching, setIsFetching] = useState(true)

    useEffect(()=>{
      async function getUserData(){
        const token=await localStorage.getItem("money-manager-token")
        const response =await fetch(`${BACKEND_URL}/api/v1/user/get-user-data`,{
          method:"GET",
          headers:{
            "Authorization":"Bearer "+token || " ",
          }
        })
        const responseData=await response.json()
        setUserData(responseData.data)
        setIsFetching(false)
      }
      getUserData()
    },[])

  return (
    <Layout className='flex flex-col gap-4'>
        <H1>Profile Page</H1>
        {isFetching && <Loader />}
        {!isFetching && JSON.stringify(userData)}
        {!isFetching && 
          <div className='flex items-center'>
            <div>
              <div className='grid grid-cols-2 items-center'>
                <img src={userData?.imgURL} width={200} height={200}/>
                <div className='flex flex-col gap-2'>
                  <H1>{userData?.name}</H1>
                  <H3>{userData?.email}</H3>
                </div>
              </div>
              <div className='flex justify-end'>
                <Button size={"icon"}> <Edit2/> </Button>
              </div>
            </div>

          </div>
        }
    </Layout>
  )
}

export default ProfilePage