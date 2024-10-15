import { Layout, UserBankDataCard, UserTagsCard } from '../components'
import { PieChartDonutWithText, RadialChartLabel } from '../components/charts'
import { 
    H1,
} from '../components/ui'

const LandingPage = () => {

  return (
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
            <UserBankDataCard />
            <PieChartDonutWithText />
            <RadialChartLabel /> 
            <UserTagsCard /> 
          </div> 
        </div>
    </Layout>
  )
}

export default LandingPage