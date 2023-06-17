import useUser from '@/hooks/useUser'
import { getUser } from '@/services/api'
import swr from 'swr'

type ChatHeaderProps = {
  id: string
}

const ChatHeader = ({ id }: ChatHeaderProps) => {
  const { data: { user } = {}, isLoading } = useUser(id)

  if (isLoading) return <div>Loading...</div>

  return (
    <header className='border-l border-[#8696a026] px-4 py-2.5 bg-[#202c33] relative flex items-center w-full h-[59px]'>
      <div className='pr-[15px] -mt-[1px] flex-none cursor-pointer'>
        <div className='relative w-10 h-10 rounded-full'>
          <img
            className='w-full h-full rounded-full'
            src={user?.image ?? 'https://picsum.photos/200/300'}
            alt='profile'
          />
        </div>
      </div>
      <div className='flex flex-col justify-center flex-1 cursor-pointer'>
        <div className='text-left -mt-[1px] flex items-start flex-1 font-medium leading-5 text-[#e9edef] whitespace-nowrap overflow-ellipsis'>
          <span className='relative flex-1 inline-block overflow-x-hidden overflow-y-hidden whitespace-normal overflow-ellipsis'>
            {user?.name}
          </span>
        </div>
        <div className='flex items-start text-[0.8125rem] leading-[1.5385] min-h-[20px] text-[#8696a0]'>
          <span className='flex-1 overflow-x-hidden overflow-y-hidden overflow-ellipsis whitespace-nowrap'>
            últ. vez hoy a la(s) 9:24 p. m.
          </span>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader
