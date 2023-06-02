//import fonts from next

type ChatCardProps = {
  i: number
}

const ChatCard = ({ i }: ChatCardProps) => {
  const border =
    i === 0 ? '' : 'border-t border-[#8696a026] hover:border-[#222e35]'

  return (
    <article
      className={
        'flex h-[72px] items-center w-full cursor-pointer hover:bg-[#222e35]'
      }
    >
      <div className='flex pr-[15px] pl-[13px] '>
        <div className='w-12 h-12'>
          <img
            className='w-full h-full rounded-full'
            src='https://picsum.photos/200/300'
            alt='profile'
          />
        </div>
      </div>
      <div
        className={`w-full ${border} pr-[15px] h-full flex flex-col justify-center`}
      >
        <div className='flex items-center text-left'>
          <h3 className='text-[#e9edef] leading-[22px] text-[17px] flex-1'>
            Chat Title
          </h3>
          <span className='text-[#00a884] text-[12px] mt-[3px] ml-[6px]'>
            12:00 P. M.
          </span>
        </div>
        <div>
          <p className='text-[#8696a0] text-sm whitespace-nowrap'>
            Chat Description
          </p>
        </div>
      </div>
    </article>
  )
}

export default ChatCard
