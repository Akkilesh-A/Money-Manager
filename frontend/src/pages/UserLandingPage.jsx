import { BarChart } from '@mui/x-charts/BarChart';
import CardComponent from '../components/CardComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVault,faArrowRight,faSackDollar,faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { TransactionComponent } from '../components/TransactionComponent';


const transactions=[{to: "2324324245345", amount : "13", tag : "Entertainment"},{to: "12132233424343", amount : "1243", tag : "Friends"},{to: "31243245342545", amount : "323", tag : "Family"},{to: "2324324245345", amount : "13", tag : "Entertainment"}]


const UserLandingPage = () => {


  return (
    <div className='px-8 py-16'>
      <div className='flex flex-wrap justify-center flex-col gap-4 md:flex-row'>
        <div className='flex gap-4 '>
          <div className='flex flex-col justify-center'>
            <CardComponent>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <FontAwesomeIcon icon={faVault} size='2xl' className='text-[4rem] text-purple-500'/>
                {/* <h1 className='text-[2em] font-bold'>Your Balance</h1> */}
                <h2 className='text-[1.5em] font-semibold'>₹ 10,000</h2>
              </div>
            </CardComponent>
            <CardComponent>
              <div className='flex flex-col justify-center items-center'>
                <FontAwesomeIcon icon={faSackDollar} size='2xl' className='text-[4rem] text-purple-400'/>
                {/* <h1 className='text-[2em] font-bold'>Your Budget</h1> */}
                <h2 className='text-[1.5em] font-semibold'>₹ 5,000</h2>
              </div>
            </CardComponent>
          </div>
          <div className='flex gap-4 justify-center'>
            <CardComponent>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Friends', 'Family', 'Online', 'School', 'Entertainment', 'Shopping', 'Stationaries', 'Custom'] }]}
                series={[{ data: [4,5,6,7,8,1,2,3] }]}
                width={760}
                height={300}
                borderRadius={8}
              />
            </CardComponent>
            <div className='flex flex-col justify-center'>
              <CardComponent>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <FontAwesomeIcon icon={faHandHoldingDollar} size='2xl' className='text-[4rem] text-purple-500' />
                  <h1 className='text-[2em] font-bold'>Your Savings</h1>
                  <h2 className='text-[1.5em] font-semibold'>₹ 5,000</h2>
                </div>
              </CardComponent>
            </div>
          </div>
        </div>
        <div className='w-[100%]'>
          <h1 className='text-[2em] font-bold'>Your Latest Transactions</h1>
          <div>
            {transactions.map(function (transaction, index){
              return(
                <TransactionComponent index={index} to={transaction.to} amount={transaction.amount} tag={transaction.tag}/>
              )
            }            
            )}
          </div>
          <div className='flex items-center gap-2 mt-4 justify-end  font-semibold'>
            <h2 className='border-b border-black text-[1.2rem]'>See More</h2>
            <FontAwesomeIcon icon={faArrowRight} className='text-[1.5rem]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLandingPage