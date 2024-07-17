const CardComponent = ({children, className}) => {
  return (
    <div className={` shadow-lg bg-white rounded-lg border-xl p-8 ${className}`}>
        {children}
    </div>
  )
}

export default CardComponent