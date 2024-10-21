import { useForm } from "react-hook-form"
import { BACKEND_URL } from "../backendURL"
import { Layout, Loader } from "../components"
import { 
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
 } from "../components/ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
  // const [userTransactions, setUserTransactions] = useState([])
  // const [isUserLoading, setIsUserLoading] = useState(true)
  const {register,handleSubmit,setValue } =useForm()
  const [isNull,setIsNull]=useState(false)
  const [tags,setTags] = useState([])
  const [tagColors,setTagColors]=useState([])
  const [favoriteTags,setFavoriteTags]=useState([])
  const [isTagsLoading, setIsTagsLoading] = useState(true)
  
  const dummyTransactions=[
    {
      "_id": "6716897da2cf71cdaf78e1c4",
      "from": "6711d51db4dc952c79952569",
      "to": "6715e7a2e3fb95eb9afd6a19",
      "amount": 233,
      "title": "title3",
      "description": "description3",
      "dateTime": "2024-10-21T17:03:51.197Z",
      "tag": "Travel",
      "receiptURL": "https://res.cloudinary.com/djeplonq5/image/upload/v1729533568/Money_Manager/User_Transactions/ezfh6ibpeqsrrsfvk8fi.jpg",
      "__v": 0
    },
    {
        "_id": "67168dc3de71a386dd61e0ef",
        "from": "6711d51db4dc952c79952569",
        "to": "6715e7a2e3fb95eb9afd6a19",
        "amount": 200,
        "title": "title",
        "description": "description",
        "dateTime": "2024-10-21T17:06:06.222Z",
        "tag": "Travel",
        "receiptURL": "https://res.cloudinary.com/djeplonq5/image/upload/v1729533568/Money_Manager/User_Transactions/ezfh6ibpeqsrrsfvk8fi.jpg",
        "__v": 0
    },
    {
        "_id": "67168eeb35c3664c1c1af782",
        "from": "6711d51db4dc952c79952569",
        "to": "6715e7a2e3fb95eb9afd6a19",
        "amount": 200,
        "title": "title",
        "description": "description",
        "dateTime": "2024-10-21T17:26:56.557Z",
        "tag": "Travel",
        "receiptURL": "https://res.cloudinary.com/djeplonq5/image/upload/v1729533568/Money_Manager/User_Transactions/ezfh6ibpeqsrrsfvk8fi.jpg",
        "__v": 0
    },
    {
        "_id": "6716963c6bf0a824f7800abb",
        "from": "6711d51db4dc952c79952569",
        "to": null,
        "amount": 123,
        "title": "summa",
        "description": "description",
        "dateTime": "2024-10-21T17:56:41.825Z",
        "tag": "Travel",
        "receiptURL": "https://res.cloudinary.com/djeplonq5/image/upload/v1729533568/Money_Manager/User_Transactions/ezfh6ibpeqsrrsfvk8fi.jpg",
        "__v": 0
    },
  ]

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

      <div className="flex gap-4">
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

        <div className="flex flex-col w-3/4">
          <H2 className="">Your Spendings</H2>
          <TransactionsAccordion transactions={dummyTransactions as Transaction[]}/>          
        </div> 
      </div>   
      
    </Layout>
  )
}

function TransactionsAccordion({transactions}:{transactions:Transaction[]}){
  return(
    <Accordion className="space-y-4" type="multiple">
      {transactions.map((transaction,index)=>{
        return (
        <Card className="px-4 py-2">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>
            <Badge variant="secondary" >{transaction.tag}</Badge>
              <H3>${transaction.amount}</H3>
            </AccordionTrigger>
            <AccordionContent className="flex justify-around">
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