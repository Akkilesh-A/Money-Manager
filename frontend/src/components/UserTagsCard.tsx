import { Plus } from "lucide-react"
import { 
  Button, 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  ColorPicker, 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
  Input,
  Label
} from "./ui"
import { Tag } from '../pages/TagsPage'
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../backendURL"
import { toast } from "sonner"
import Loader from "./Loader"

// function UserTagsCard({tags,tagColors}:{tags?:string[],tagColors?:string[]}){
function UserTagsCard(){
  
    const {register,handleSubmit} =useForm()

    const [newTagColor,setNewTagColor]=useState("")

    const [isNull,setIsNull]=useState(false)
    const [tags,setTags] = useState([])
    const [tagColors,setTagColors]=useState([])
    const [isTagsLoaded, setIsTagsLoaded] = useState(false)

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
        setTags(responseData.data.tags)
        setIsTagsLoaded(true)
    }

    useEffect(()=>{
        getTagsData()
    },[])

    async function onSubmit(data:any){
        const dataToBeSent={
            newTag:data.newTag,
            newTagColor:newTagColor
        }
        const response=await fetch(`${BACKEND_URL}/api/v1/user/add-new-tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("money-manager-token")}`
            },
            body: JSON.stringify(dataToBeSent)
        }
        )
        const responseData=await response.json()
        if(response.status!==200){
            toast.error(responseData.message)
            return
        }
        toast.success(responseData.message) 
        setIsTagsLoaded(false) 
        await setTags(responseData.data.tags)
        await setTagColors(responseData.data.tagColors)
        setIsTagsLoaded(true)
    }

    return(
      <Card className="space-y-4 ">
        <CardHeader className="text-2xl font-bold">Tags</CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            {!isTagsLoaded && <Loader />}
            {
                tags.map((tag,index)=>{
                    const color=tagColors[index]
                    return(
                        <Tag key={index} color={color} tag={tag}/>
                    )
                })
            } 
            {isNull && 
                <div>
                    No Tags Found
                </div>
            }
        </CardContent>
        <CardFooter className="flex justify-end">
            <Dialog>
                <DialogTrigger asChild>
                <Button className="" size="icon">
                    <Plus className="h-4 w-4" />
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Tag</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <Label>New Tag Name</Label>
                    <Input
                        type="text"
                        placeholder="Tag Name"
                        {...register("newTag",{
                            required:{
                                value:true,
                                message:"Tag Name is required"
                            }
                        })}
                    />
                    {/* {errors.newTag && <Badge variant={"destructive"}>{errors.newTag.message}</Badge>} */}
                    <Label>Tag Color</Label>
                    <ColorPicker value="" onChange={(e)=>setNewTagColor(e)}/>
                    <div className="flex justify-end">
                        <Button>Add New Tag</Button>
                    </div>
                </form>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
  )
}

export default UserTagsCard