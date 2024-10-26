import { useEffect, useState } from 'react'
import { Layout, Loader, UserBankDataCard, UserTagsCard } from '../components'
import { PieChartDonutWithText, RadialChartLabel } from '../components/charts'
import { 
    H1,
    P,
} from '../components/ui'
import { BACKEND_URL } from '../backendURL'

const LandingPage = () => {

  const [chartData1, setChartData1] = useState([])
  const [chartConfig1, setChartConfig1] = useState({})
  const [isNoOfSpendingsLoading, setIsNoOfSpendingsLoading] = useState(true)
  useEffect(()=>{
    async function fetchNoOfSpendingsGraphData(){
      const response=await fetch(`${BACKEND_URL}/api/v1/user/get-number-of-spendings-per-tag`,{
        headers:{
          "Authorization" :"Bearer " + localStorage.getItem("money-manager-token")
        }
      })
      const responseData=await response.json()
      setChartData1(responseData.data.chartData)
      setChartConfig1(responseData.data.chartConfig)
      setIsNoOfSpendingsLoading(false)
    }
    fetchNoOfSpendingsGraphData()
  },[])

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
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
            <UserBankDataCard />
            {isNoOfSpendingsLoading && <Loader />}
            {!isNoOfSpendingsLoading && 
              <PieChartDonutWithText chartData={chartData1} chartConfig={chartConfig1}/>
            }
            {!isSpendingsLoading && 
              <RadialChartLabel chartData={chartData2} chartConfig={chartConfig2}/>
            }
            <UserTagsCard /> 
          </div> 
        </div>
    </Layout>
  )
}

export default LandingPage