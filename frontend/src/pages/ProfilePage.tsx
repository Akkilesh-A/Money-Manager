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
import { Layout } from '../components'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {

    const navigate=useNavigate()

  return (
    <Layout className='flex flex-col gap-4'>
        <H1>Profile Page</H1>
        <H2>Current Profile</H2>
        <img src='' />
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