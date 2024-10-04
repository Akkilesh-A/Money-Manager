import { Layout } from '../components'
import { RadialChartLabel } from '../components/charts'
import { 
    H1, 
} from '../components/ui'

const LandingPage = () => {
  return (
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='flex'>
            <RadialChartLabel />   
          </div> 
        </div>
    </Layout>
  )
}

export default LandingPage