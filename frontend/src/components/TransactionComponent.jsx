import CardComponent from "./CardComponent"

export default function TransactionComponent (props){
  return (
    <CardComponent key={props.index}>
        <div className='flex justify-between items-center'>
        <div>
          <div className="flex flex-col gap-4">
              <h3 className='text-[1.2rem] font-semibold' >To : {props.to}</h3> 
              
          </div>
          <h3 className='text-[1.2rem] font-semibold' >Amount : {props.amount}</h3> 
        </div>
        <div className="flex">
                <h3 className='rounded-xl text-purple-600 border-purple-600 border-2 font-semibold text-center p-1'>{props.tag}</h3> 
            </div>
        </div>        
    </CardComponent>
  )
}
