type DateItemProps = {
  date: string
}

const DateItem = ({ date }: DateItemProps) => {
  return (
    <article className='flex items-center justify-center w-full mb-3'>
      <div className='mb-0 px-3 pt-[5px] pb-1.5 rounded-[7.5px] shadow-sm inline-block flex-none text-[12.5px] leading-[21px] text-[#8696a0] relative bg-[#182229]'>
        <span className='visible'>{date.toUpperCase()}</span>
      </div>
    </article>
  )
}

export default DateItem
