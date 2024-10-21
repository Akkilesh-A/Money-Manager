import { useForm } from "react-hook-form"
import { BACKEND_URL } from "../backendURL"
import { Layout, Loader } from "../components"
import { 
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  H1,   
  H3,   
  Input,   
  Label,   
  P,   
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from "../components/ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// interface User{
//   index:number,
//   name:string,
//   userId:string
// }

const SpendingsPage = () => {

  // const [allUsers, setAllUsers] = useState<User[]>([])
  // const [userTransactions, setUserTransactions] = useState([])
  // const [isUserLoading, setIsUserLoading] = useState(true)
  const {register,handleSubmit,setValue } =useForm()
  const [isNull,setIsNull]=useState(false)
  const [tags,setTags] = useState([])
  const [tagColors,setTagColors]=useState([])
  const [favoriteTags,setFavoriteTags]=useState([])
  const [isTagsLoading, setIsTagsLoading] = useState(true)
  

  //Get all users
  // useEffect(()=>{
  //   async function getAllUsers() {
  //     const response=await fetch(`${BACKEND_URL}/api/v1/user/get-all-users`,{
  //       method:"GET",
  //       headers:{
  //         "Authorization" : "Bearer " + localStorage.getItem("money-manager-token")
  //       }
  //     })
  //     const responseData=await response.json()
  //     setAllUsers(responseData.data)
  //     setIsUserLoading(false)
  //   }
  //   getAllUsers()    
  // },[])

  //Get User Tags
  useEffect(()=>{
      async function getTagsData(){
          const token=await localStorage.getItem("money-manager-token")
          const response = await fetch(`${BACKEND_URL}/api/v1/user/get-user-tags`,{
              method:"GET",
              headers:{
                  "Authorization" : "Bearer "+token
              }
          })
          const responseData=await response.json()
          if(!responseData.data.tags){
              setIsNull(true)
              return
          }
          setTagColors(responseData.data.tagColors)
          setFavoriteTags(responseData.data.favoriteTags)
          setTags(responseData.data.tags)
          setIsTagsLoading(false)
      }
      getTagsData()
  },[])

  async function onSubmit(data:any){
    const dataTobeSent=new FormData()
    dataTobeSent.append("title",data.title)
    dataTobeSent.append("description",data.description)
    dataTobeSent.append("amount",data.amount)
    dataTobeSent.append("tag",data.tag)
    dataTobeSent.append("receiptImage",data.receiptImage[0])
    try{
      const response=await fetch(`${BACKEND_URL}/api/v1/user/create-spending-record`,{
        method:"POST",
        body:dataTobeSent,
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("money-manager-token")        }
      })
      console.log(response)
    }catch(err){
      console.log(err)
    }   
  }

  return (
    <Layout className="flex flex-col gap-8">
      <div>
        <H1>Record Spending</H1>
      </div>

      <div className="flex">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <H3>Create a new Transaction</H3>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                  {/* <Select onValueChange={(val:string)=>setValue("to",val)}>
                    <SelectTrigger className="w-[380px]">
                      <SelectValue placeholder="Select a User" />
                    </SelectTrigger>
                    <SelectContent>
                        {allUsers.map((user,index)=>{
                          return(
                            <SelectItem key={index} value={user.userId}>{user.name}</SelectItem>
                          )
                        })}
                    </SelectContent>
                  </Select> */}

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="title">Spent on?</Label>
                    <Input {...register("title",{
                        required: "This field is required"
                    })} id="title" placeholder="What did you spend on?" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input {...register("description",{
                        required: "This field is required"
                    })} id="description" type="text" placeholder="Brief Description" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input {...register("amount",{
                        required: "This field is required"
                    })} id="amount" type="number" placeholder="How much?" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="receiptURL">Bil/Receipt Image</Label>
                    <Input {...register("receiptImage",{
                        required: "This field is required"
                    })} id="receiptURL" accept="image/png, image/gif, image/jpeg" type="file" placeholder="" />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="tag">Select Tag</Label>
                    {isTagsLoading && !isNull && <Loader />}
                    {isNull && 
                      <div className="flex gap-2 items-center">
                        <P>No Tags</P>
                        <Link to="/tags" >Add a Tag?</Link>
                      </div>
                    }
                    {!isTagsLoading && 
                      <Select onValueChange={(val:string)=>setValue("tag",val)}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select Tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Favorite Tags</SelectLabel>
                            {favoriteTags.map((favoriteTag,index)=>{
                              const localIndex=tags.indexOf(favoriteTag)
                              const color=tagColors[localIndex]
                              return(
                                <SelectItem style={{color:color}} key={index} value={favoriteTag}>{favoriteTag}</SelectItem>
                              )
                            })}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>All Tags</SelectLabel>
                            {tags.map((tag,index)=>{
                              const tagIndex=favoriteTags.indexOf(tag)
                              if(tagIndex!=-1){
                                return
                              }
                              return(
                                <SelectItem style={{color:tagColors[index]}} key={index} value={tag}>{tag}</SelectItem>
                              )
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select> 
                    }
                  </div>
                  
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Record</Button>
            </CardFooter>
          </Card>
        </form>
      </div>      
      
    </Layout>
  )
}

export default SpendingsPage