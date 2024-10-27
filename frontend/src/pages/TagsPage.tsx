import { useEffect, useState } from "react"
import { Layout, Loader, UserTagsCard } from "../components"
import {
    H1, 
} from "../components/ui"
import { RadialChartLabel } from "../components/charts"
import { BACKEND_URL } from "../backendURL"

const TagsPage = () => {
    
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
            <UserTagsCard />
            {isSpendingsLoading && <Loader />}
            {!isSpendingsLoading && 
              <RadialChartLabel chartData={chartData2} chartConfig={chartConfig2}/>
            }
        </div>             
    </Layout>
  )
}

export function Tag({tag,color}:{tag:string,color:string}){
    return(
        <div style={{backgroundColor:color}} className={`p-2 rounded-xl gap-4 flex items-center justify-center `}>
            <p>{tag}</p>
        </div>
    )
}


export default TagsPage