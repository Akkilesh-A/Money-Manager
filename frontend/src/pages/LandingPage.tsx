import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../components'
import { RadialChartLabel } from '../components/charts'
import { 
  Button,
    H1,
    H2, 
} from '../components/ui'
import { decrement, increment } from '../app/features/userData/userDataSlice'

const LandingPage = () => {

  const value=useSelector((state:{userData:{value:number}})=>state.userData.value)
  // const value=0
  const dispatch=useDispatch()

  return (
    <Layout>
        <div className='flex-col gap-8 flex'>
          <H1>Welcome, you finance freak!</H1> 
          <div className='flex'>
            <RadialChartLabel />   
          </div> 
          <div>
            <Button onClick={()=>{
              dispatch(increment())
            }}>Increment</Button>
            <H2>{value}</H2>
            <Button onClick={()=>{
              dispatch(decrement())
            }}>Decrement</Button>
          </div>
        </div>
    </Layout>
  )
}

export default LandingPage