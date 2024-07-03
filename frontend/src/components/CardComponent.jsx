const CardComponent = ({children}) => {
  return (
    <div className='shadow-lg rounded-lg border-xl p-8'>
        {children}
    </div>
  )
}

export default CardComponent