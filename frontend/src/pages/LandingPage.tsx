import { useEffect, useState } from 'react'
import { Layout, Loader, UserBankDataCard, UserTagsCard } from '../components'
import { PieChartDonutWithText, RadialChartLabel } from '../components/charts'
import { 
    H1,
    P,
} from '../components/ui'
import { BACKEND_URL } from '../backendURL'

const LandingPage = () => {

  const [chartData, setChartData] = useState([])
  const [chartConfig, setChartConfig] = useState({})
  const [isNoOfSpenginsLoading, setIsNoOfSpenginsLoading] = useState(true)
  useEffect(()=>{
    async function fetchNoOfSpendingsGraphData(){
      const response=await fetch(`${BACKEND_URL}/api/v1/user/get-number-of-spendings-per-tag`,{
        headers:{
          "Authorization" :"Bearer " + localStorage.getItem("money-manager-token")
        }
      })
      const responseData=await response.json()
      setChartData(responseData.data.chartData)
      setChartConfig(responseData.data.chartConfig)
      setIsNoOfSpenginsLoading(false)
    }
    fetchNoOfSpendingsGraphData()
  },[])

  return (
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
            <UserBankDataCard />
            {isNoOfSpenginsLoading && <Loader />}
            {!isNoOfSpenginsLoading && 
              <PieChartDonutWithText chartData={chartData} chartConfig={chartConfig}/>
            }
            <RadialChartLabel /> 
            <UserTagsCard /> 
          </div> 
        </div>
    </Layout>
  )
}

export default LandingPage