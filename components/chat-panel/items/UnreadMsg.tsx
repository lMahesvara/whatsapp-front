const UnreadMsg = ({ amount }: { amount: number }) => {
  const text = amount === 1 ? 'mensaje nuevo' : 'mensajes nuevos'

  return (
    <article className=' py-[5px] mb-3 text-center bg-[#16232cad] w-full text-[12.5px] text-[#e9edefe0] uppercase'>
      <span className='px-[22px] rounded-2xl bg-[#1f2c35] max-w-[90%] h-[33px]  overflow-hidden font-medium leading-[33px] overflow-ellipsis whitespace-nowrap align-top inline-block'>
        {amount} {text}
      </span>
    </article>
  )
}

export default UnreadMsg
