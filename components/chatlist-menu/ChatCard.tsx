import useUser from '@/hooks/useUser'
import { getUser } from '@/services/api'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ChatCardSkeleton from '../skeletons/ChatCardSkeleton'
import { IMessage } from '@/types/Message'
import { getDateFormat, getTimeFormat } from '@/utils/timeFormat'
import { IChat } from '@/types/Chat'
import { useChatStore } from '@/store/chatStore'
import { useSession } from 'next-auth/react'
import { User } from '@/types/User'

type ChatCardProps = {
  i: number
  active: boolean
  chat?: IChat
  friendId: string
  setChatAsRead: (chatId: string) => void
  showChatsSection: () => void
}

const ChatCard = ({
  i,
  active,
  chat,
  friendId,
  setChatAsRead,
  showChatsSection,
}: ChatCardProps) => {
  const { data: sessionData } = useSession()
  const user = sessionData?.user as User
  const { setFriendId, setChatId } = useChatStore()
  const [unread, setUnread] = useState(false)
  const [amount, setAmount] = useState(0)

  const isSelectedStyles = active ? 'bg-[#2A3942]' : 'hover:bg-[#222e35]'
  const border =
    i === 0 ? '' : 'border-t border-[#8696a026] hover:border-[#222e35]'
  const dateStyles = unread ? 'text-[#00a884]' : 'text-[#8696a0]'
  const textStyles = unread ? 'text-[#d1d7db]' : 'text-[#8696a0]'

  const { data: { user: friend } = {}, isLoading } = useUser(friendId)

  useEffect(() => {
    if (!user._id || !chat) return

    console.log(chat?.unread)
    const unread = chat?.unread?.find(
      member => member.member === user._id && member.amount > 0
    )
    if (!unread) return

    if (unread.amount > 0) {
      setUnread(true)
      setAmount(unread.amount)
      console.log(unread)
    } else {
      setUnread(false)
      setAmount(0)
    }

    return () => {
      setUnread(false)
      setAmount(0)
    }
  }, [chat, setChatAsRead])

  const handleActiveClick = () => {
    if (active) return
    setFriendId(friendId)
    setChatId(chat?._id ?? '')

    if (!chat) {
      showChatsSection()
      return
    }
    console.log('Chat leido')
    setUnread(false)
    setAmount(0)
    setChatAsRead(chat._id)
  }

  if (isLoading) return <ChatCardSkeleton />
  return (
    <article
      className={`flex h-[72px] items-center w-full cursor-pointer ${isSelectedStyles}`}
      onClick={handleActiveClick}
    >
      <div className='flex pr-[15px] pl-[13px] '>
        <div className='w-12 h-12'>
          <img
            className='w-full h-full rounded-full'
            src={friend.image ?? 'https://picsum.photos/200/300'}
            alt='profile'
          />
        </div>
      </div>
      <div
        className={`w-full ${
          !active && border
        } pr-[15px] h-full flex flex-col justify-center`}
      >
        <div className='flex items-center text-left'>
          <span className='text-[#e9edef] leading-[22px] text-[17px] flex-1'>
            {friend?.name}
          </span>
          <span className={`${dateStyles} text-[12px] mt-[3px] ml-[6px]`}>
            {chat?.lastMessage?.createdAt &&
              getDateFormat({
                date: chat.lastMessage.createdAt,
                showToday: false,
              })}
          </span>
        </div>
        <div className='flex items-center text-[13px] leading-5 mt-0.5'>
          <p
            className={`${textStyles} text-sm whitespace-nowrap overflow-ellipsis overflow-y-hidden grow relative`}
          >
            {chat?.lastMessage?.text}
          </p>
          {unread && (
            <span className='font-semibold text-center bg-[#00a884] text-[#111b21] min-h-[1em] text-xs min-w-[20.39px] pt-[.3em] pb-[.4em] rounded-full px-[.4em] leading-[1] align-top inline-block'>
              {amount}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ChatCard
