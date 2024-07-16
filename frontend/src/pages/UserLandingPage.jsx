import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVault,faArrowRight,faSackDollar,faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { TransactionComponent, CardComponent, PageWrapper, SideBar } from '../components';


const transactions=[{to: "2324324245345", amount : "13", tag : "Entertainment"},{to: "12132233424343", amount : "1243", tag : "Friends"},{to: "31243245342545", amount : "323", tag : "Family"},{to: "2324324245345", amount : "13", tag : "Entertainment"}]

const TransactionsSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[1.5em] md:text-[2em] font-bold'>Your Latest Transactions</h1>
      <div className='flex flex-col gap-4'>
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
  )
}

const LandingSectionForUser = () => {
  return (
    <div className='flex gap-4 md:flex-row flex-col'>
      <div className='flex flex-col justify-center gap-4'>
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
  )
}

const UserLandingPage = () => {


  return (
    <div className="flex">
      <SideBar />
      <PageWrapper>
          <div className='flex flex-col gap-8'>
            <LandingSectionForUser />
            <TransactionsSection />
          </div>
      </PageWrapper>
    </div>
  )
}

export default UserLandingPage