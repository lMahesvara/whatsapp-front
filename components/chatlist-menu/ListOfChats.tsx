import ChatCard from './ChatCard'
import { UsersToShow } from '@/types/UsersToShow'

type ListOfChatsProps = {
  users: UsersToShow[]
  friendId: string
  setChatAsRead: (chatId: string) => void
  showChatsSection: () => void
}

const ListOfChats = ({
  users,
  friendId,
  setChatAsRead,
  showChatsSection,
}: ListOfChatsProps) => {
  return (
    <div className='relative flex-grow overflow-y-auto'>
      {users?.map((chat, i) => (
        <ChatCard
          key={chat.userId}
          i={i}
          friendId={chat.userId}
          chat={chat.chat}
          active={chat.userId === friendId}
          setChatAsRead={setChatAsRead}
          showChatsSection={showChatsSection}
        />
      ))}
    </div>
  )
}

export default ListOfChats
