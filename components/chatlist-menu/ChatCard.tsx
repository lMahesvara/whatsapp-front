import useUser from '@/hooks/useUser'
import { getUser } from '@/services/api'
import useSWR from 'swr'

type ChatCardProps = {
  i: number
  id: string
  handleFriendId: (id: string) => void
}

const ChatCard = ({ i, id, handleFriendId }: ChatCardProps) => {
  const border =
    i === 0 ? '' : 'border-t border-[#8696a026] hover:border-[#222e35]'

  const { data: { user } = {}, isLoading } = useUser(id)

  if (isLoading) return <div>Loading...</div>
  return (
    <article
      className={
        'flex h-[72px] items-center w-full cursor-pointer hover:bg-[#222e35]'
      }
      onClick={() => handleFriendId(id)}
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
          <span className='text-[#e9edef] leading-[22px] text-[17px] flex-1'>
            {user?.name}
          </span>
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
