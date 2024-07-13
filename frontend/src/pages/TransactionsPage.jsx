import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { TransactionComponent, PageWrapper } from '../components';

const transactions=[{to: "2324324245345", amount : "13", tag : "Entertainment"},{to: "12132233424343", amount : "1243", tag : "Friends"},{to: "31243245342545", amount : "323", tag : "Family"},{to: "2324324245345", amount : "13", tag : "Entertainment"}]

const TransactionsPage = () => {
  return (
    <PageWrapper>
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between '>
                <h1 className='text-[2em] md:text-[2em] font-bold'>Your Latest Transactions</h1>
                <select className='border-black  w-[100%] md:w-[40%] bg-gray-500 rounded text-gray-900 p-3'>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Entertainment</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Food</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Custom</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Miscellaneous</option>
                </select> 
            </div>
            <div className='flex flex-col gap-4'>
                {transactions.map(function (transaction, index){
                return(
                    <TransactionComponent index={index} to={transaction.to} amount={transaction.amount} tag={transaction.tag}/>
                )
                }            
                )}
            </div>
            <div className='flex items-center gap-2 mt-4 justify-center  font-semibold'>
                <FontAwesomeIcon icon={faArrowLeft} className='text-[1.5rem]' />
                <h2 className='border-b border-black text-[1.5rem]'>1 2 3 4</h2>
                <FontAwesomeIcon icon={faArrowRight} className='text-[1.5rem]' />
            </div>
        </div>
    </PageWrapper>
  )
}

export default TransactionsPage