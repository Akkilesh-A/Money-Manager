import { 
    Button, 
    H1, 
    H2,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
 } from '../components/ui'
import { Layout, Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../backendURL'

const ProfilePage = () => {

    const navigate=useNavigate()

    const[userData,setUserData]=useState({})
    const [isFetching, setIsFetching] = useState(true)

    useEffect(()=>{
      async function getUserData(){
        const token=await localStorage.getItem("money-manager-token")
        const response =await fetch(`${BACKEND_URL}/api/v1/adult/get-user-data`,{
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
          <img src={userData.imgURL} width={200} height={200}/>
        }
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"default"}>Update Profile</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Want to update your profile?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently change your
                  profile in our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{
                  navigate("/update-profile")
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    </Layout>
  )
}

export default ProfilePage