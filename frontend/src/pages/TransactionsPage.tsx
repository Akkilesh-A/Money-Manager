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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from "../components/ui"
import { useEffect, useState } from "react"

interface User{
  index:number,
  name:string,
  userId:string
}

const TransactionsPage = () => {

  const [allUsers, setAllUsers] = useState<User[]>([])
  // const [userTransactions, setUserTransactions] = useState([])
  const [isUserLoading, setIsUserLoading] = useState(true)
  const {register,handleSubmit,setValue } =useForm()
  const [isNull,setIsNull]=useState(false)
  const [tags,setTags] = useState([])
  const [tagColors,setTagColors]=useState([])
  const [favoriteTags,setFavoriteTags]=useState([])
  const [isTagsLoading, setIsTagsLoading] = useState(true)
  

  //Get all users
  useEffect(()=>{
    async function getAllUsers() {
      const response=await fetch(`${BACKEND_URL}/api/v1/user/get-all-users`,{
        method:"GET",
        headers:{
          "Authorization" : "Bearer " + localStorage.getItem("money-manager-token")
        }
      })
      const responseData=await response.json()
      setAllUsers(responseData.data)
      setIsUserLoading(false)
    }
    getAllUsers()    
  },[])

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

  const onSubmit:(data:any)=>void = (data)=>{
    console.log(data)
    
  }

  return (
    <Layout>
      <div>
        <H1>Record Transaction</H1>
      </div>

      {isUserLoading || isTagsLoading && <Loader />}

      {!isUserLoading && !isTagsLoading && 
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <H3>Create a new Transaction</H3>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
                <Select onValueChange={(val:string)=>setValue("to",val)}>
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
                </Select>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Spent on?</Label>
                  <Input {...register("title",{
                      required: "This field is required"
                  })} id="name" placeholder="user@example.com" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Description</Label>
                  <Input {...register("description",{
                      required: "This field is required"
                  })} id="name" type="text" placeholder="" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Amount</Label>
                  <Input {...register("amount",{
                      required: "This field is required"
                  })} id="name" type="number" placeholder="" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Bil/Receipt Image</Label>
                  <Input {...register("receiptURL",{
                      required: "This field is required"
                  })} id="name" type="text" placeholder="" />
                </div>

                <Select onValueChange={(val:string)=>setValue("tag",val)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
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
                
            </div>
          </CardContent>
          <CardFooter>
            <Button>Create Record</Button>
          </CardFooter>
        </Card>
      </form>
      }
      
    </Layout>
  )
}

export default TransactionsPage