import { useEffect, useState } from 'react'
import { Layout, Loader, UserBankDataCard, UserTagsCard } from '../components'
import { PieChartDonutWithText, RadialChartLabel } from '../components/charts'
import { 
    H1,
    H2,
} from '../components/ui'
import { BACKEND_URL } from '../backendURL'
import { TransactionsAccordion } from './SpendingsPage'

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


    //Get All Spendings
    const [isSpendingsNull, setIsSpendingsNull] = useState(false)
    const [isTransactionsLoading,setIsTransactionsLoading] = useState(true)
    const [userSpendings, setUserSpendings] = useState([])
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

  return (
    <Layout>
        <div className='flex-col gap-8 flex '>
          <H1>Welcome, you finance freak!</H1> 
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 '>
            <div className='space-y-4'>
              <UserBankDataCard />
              <UserTagsCard /> 
            </div>
            {isNoOfSpendingsLoading && <Loader />}
            <div className='space-y-4'>
              {!isNoOfSpendingsLoading && 
                <PieChartDonutWithText chartData={chartData1} chartConfig={chartConfig1}/>
              }
              {!isSpendingsLoading && 
                <RadialChartLabel chartData={chartData2} chartConfig={chartConfig2}/>
              }
            </div>
            <div className="w-full p-2 h-[80vh] overflow-scroll overflow-x-hidden scrollbar">
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
        </div>
    </Layout>
  )
}

export default LandingPage