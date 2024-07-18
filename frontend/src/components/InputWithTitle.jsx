const InputWithTitle = ({title,type,placeholder}) => {
  return (
    <div>
        <h1>{title}</h1>
        <div className='flex flex-col gap-2'>
            <h2>{type}</h2>
            <input type="text" placeholder={`${placeholder}`} className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
        </div>
    </div>
  )
}

export default InputWithTitle