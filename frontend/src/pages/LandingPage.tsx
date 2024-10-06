import { Layout, UserBankDataCard, UserTagsCard } from '../components'
import { BarChartComponent, PieChartDonutWithText, RadialChartLabel } from '../components/charts'
import { 
    H1,
} from '../components/ui'

const LandingPage = () => {

  return (
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='flex sm:flex-row flex-col gap-4'>
            <UserBankDataCard />
            <PieChartDonutWithText />
            <RadialChartLabel />  
          </div> 
          <div className='flex sm:flex-row flex-col gap-4'>
            <div>
              <UserTagsCard />
            </div>
            <div>
              Transaction here!
            </div>
          </div> 
        </div>
    </Layout>
  )
}

export default LandingPage