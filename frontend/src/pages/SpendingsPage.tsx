import { useForm } from "react-hook-form"
import { BACKEND_URL } from "../backendURL"
import { Layout, Loader } from "../components"
import { 
  Badge,
  Button,
  Card,
  H1,   
  H2,   
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
 } from "../components/ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

// interface User{
//   index:number,
//   name:string,
//   userId:string
// }

interface Transaction{
  "_id": string,
  "from": string,
  "to": string,
  "amount": number,
  "title": string,
  "description": string,
  "dateTime": "2024-10-21T17:03:51.197Z",
  "tag": string,
  "receiptURL": string,
  "__v": 0
}

const SpendingsPage = () => {

  // const [allUsers, setAllUsers] = useState<User[]>([])
  const [isTransactionsLoading,setIsTransactionsLoading] = useState(true)
  const [userSpendings, setUserSpendings] = useState([])
  // const [isUserLoading, setIsUserLoading] = useState(true)
  const {register,handleSubmit,setValue } =useForm()
  const [isSpendingsNull, setIsSpendingsNull] = useState(false)
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

  //Get All Spendings
  useEffect(()=>{
    async function getUserSpendings(){
      const token=await localStorage.getItem("money-manager-token")
      const response = await fetch(`${BACKEND_URL}/api/v1/user/get-user-spendings`,{
          method:"GET",
          headers:{
              "Authorization" : "Bearer "+token
          }
      })
      const responseData=await response.json()
      if(responseData.data.length==0){
        setIsSpendingsNull(true)
      }
      setUserSpendings(responseData.data)
      setIsTransactionsLoading(false)
  }
  getUserSpendings()
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
    <Layout className="flex flex-col gap-4">
      <div>
        <H1>Your Spendings</H1>
      </div>     
      <div className="flex gap-4">
        <div className="w-1/4 hidden sm:block border-r ">
          Filters
        </div>
        <div className="sm:w-3/4 w-full p-2 h-[80vh] overflow-scroll overflow-x-hidden scrollbar">
          {isTransactionsLoading && <Loader />}
          {isSpendingsNull && 
            <div className="flex flex-col justify-center items-center">
              <div>
                <img src="/illustrations/empty_folder.svg" width={600} />  
                <H2 className="">Nothing to look here</H2>
              </div>
            </div>
          }
          {!isTransactionsLoading && <TransactionsAccordion transactions={userSpendings}/>}
        </div>          
      </div> 
      <div className="fixed bottom-10 right-10">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2">
              {isSpendingsNull && <H3 className="flex items-center">Start adding spendings here </H3>}
              <Button variant="outline" size="icon" className=""><Plus /></Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Record a spending</DialogTitle>
              <DialogDescription>
                Record a spending with details and receipt image if needed!
              </DialogDescription>
            </DialogHeader>
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
            <DialogFooter>
              <Button onClick={()=>handleSubmit(onSubmit)} type="submit">Add Spending</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    
    </Layout>
  )
}

function TransactionsAccordion({transactions}:{transactions:Transaction[]}){
  return(
    <Accordion className="space-y-4" type="multiple">
      {transactions.map((transaction,index)=>{
        return (
        <Card key={index} className="px-4 py-2">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>
            <Badge variant="secondary" >{transaction.tag}</Badge>
              <H3>${transaction.amount}</H3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col sm:flex-row justify-around">
              <P className="text-gray-300">Description : {transaction.description}</P>
              <img width={200} src={transaction.receiptURL} />
            </AccordionContent>
          </AccordionItem>
        </Card>)
      })
      }
    </Accordion>
  )
}

export default SpendingsPage