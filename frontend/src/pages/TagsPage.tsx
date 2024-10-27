import { useEffect, useState } from "react"
import { Layout, Loader } from "../components"
import { 
    Button, 
    Card, 
    CardContent, 
    CardFooter, 
    ColorPicker, 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
    H1, 
    H3, 
    Input,
    Label
} from "../components/ui"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { RadialChartLabel } from "../components/charts"
import { BACKEND_URL } from "../backendURL"

const TagsPage = () => {
    
    const [isNull,setIsNull]=useState(false)
    const [tags,setTags] = useState([])
    const [tagColors,setTagColors]=useState([])
    const [favoriteTags,setFavoriteTags]=useState([])
    const [isTagsLoaded, setIsTagsLoaded] = useState(false)
    const [newTag,setNewTag]=useState("")
    const [newTagColor,setNewTagColor]=useState("")
        
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
        setIsTagsLoaded(true)
    }

    useEffect(()=>{
        getTagsData()
    },[])

    async function addNewTag(){
        const dataToBeSent={
            newTag:newTag,
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
        setTags(responseData.data.tags)
        setTagColors(responseData.data.tagColors)
    }

    const [chartData2, setChartData2] = useState([])
    const [chartConfig2, setChartConfig2] = useState({})
    const [isSpendingsLoading, setIsSpendingsLoading] = useState(true)
    useEffect(()=>{
      async function fetchNoOfSpendingsGraphData(){
        const response=await fetch(`${BACKEND_URL}/api/v1/user/get-number-of-spendings-per-tag`,{
          headers:{
            "Authorization" :"Bearer " + localStorage.getItem("money-manager-token")
          }
        })
        const responseData=await response.json()
        setChartData2(responseData.data.chartData)
        setChartConfig2(responseData.data.chartConfig)
        setIsSpendingsLoading(false)
      }
      fetchNoOfSpendingsGraphData()
    },[])

  return (
    <Layout className="space-y-8">
        <H1>Tags</H1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {!isTagsLoaded && <Loader /> }

            {isTagsLoaded && isNull && 
                <div>
                    No Data    
                </div>
            }

            {isTagsLoaded &&  <Card className="p-2 space-y-2 ">
                <H3 className="p-4">
                    User Tags
                </H3>
                <CardContent className="flex flex-wrap gap-4">
                    {
                        tags.map((tag,index)=>{
                            const color=tagColors[index]
                            return(
                                <Tag key={index} color={color} tag={tag}/>
                            )
                        })
                    } 
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button className=" rounded-full" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                        </DialogTrigger>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Tag</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4  py-4">
                            <Label>New Tag Name</Label>
                            <Input
                                type="text"
                                placeholder="Tag Name"
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            <Label>Tag Color</Label>
                            <ColorPicker value="" onChange={(e)=>setNewTagColor(e)}/>
                            <div className="flex justify-end">
                                <Button onClick={addNewTag}>Add New Tag</Button>
                            </div>
                        </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>}

            {isTagsLoaded &&  <Card className="p-2 space-y-2 flex flex-col justify-between">
                <H3 className="p-4">
                    Favorite Tags
                </H3>
                <CardContent className="flex gap-4">
                    {
                        favoriteTags.map((favoriteTag,index)=>{
                            const localIndex=tags.indexOf(favoriteTag)
                            const color=tagColors[localIndex]
                            return(
                                <Tag key={index} color={color} tag={favoriteTag}/>
                            )
                        })
                    } 
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button className=" rounded-full" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                        </DialogTrigger>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a Favorite Tag</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            
                            <Button onClick={addNewTag}>Create Alert</Button>
                        </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>}

            {!isSpendingsLoading && 
              <RadialChartLabel chartData={chartData2} chartConfig={chartConfig2}/>
            }

        </div>             
    </Layout>
  )
}

function Tag({tag,color}:{tag:string,color:string}){
    return(
        <div style={{backgroundColor:color}} className={`p-2 rounded-xl gap-4 flex items-center justify-center `}>
            <p>{tag}</p>
        </div>
    )
}

export default TagsPage