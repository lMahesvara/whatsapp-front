'use client'
import ChatlistHeader from '@/components/chatlist-menu/ChatlistHeader'
import ChatPanel from '@/components/chat-panel/ChatPanel'
import { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import ChatlistSections from '@/components/chatlist-menu/ChatlistSections'
import useSWR from 'swr'
import { getChats, getUsers, readMessages } from '@/services/api'
import ListOfChats from '@/components/chatlist-menu/ListOfChats'
import { IChat } from '@/types/Chat'
import { User } from '@/types/User'
import { UsersToShow } from '@/types/UsersToShow'
import { IMessage } from '@/types/Message'
import { useChatStore } from '@/store/chatStore'
import { useSession } from 'next-auth/react'

export default function Home() {
  const socket = useRef<any>(null)
  const { data: sessionData } = useSession()
  const user = sessionData?.user as User

  const [connectedUsers, setConnectedUsers] = useState<string[]>([])
  const [chats, setChats] = useState<UsersToShow[]>([])
  const [usersRegistered, setUsersRegistered] = useState<UsersToShow[]>([])
  const [usersToShow, setUsersToShow] = useState<UsersToShow[]>([])
  const { friendId, chatId } = useChatStore()
  const { data, isLoading } = useSWR(`/api/chats/${user?._id ?? ''}`, () =>
    getChats(user._id ?? '')
  )

  const { data: usersData, isLoading: usersLoading } = useSWR(
    `/api/users`,
    () => getUsers()
  )

  const setChatAsRead = useCallback(
    async (chatId: string) => {
      const newMessages = [...chats]
      const index = newMessages.findIndex((chat: UsersToShow) => {
        return chat.chat?._id === chatId
      })
      if (index === -1) return

      const chatRead = await readMessages(chatId, user._id ?? '')

      newMessages[index].chat = chatRead

      console.log(newMessages)

      setChats(newMessages)
      setUsersToShow(newMessages)
    },
    [chats, user?._id]
  )

  const updateChats = useCallback(
    (message: IMessage) => {
      const newMessages = [...chats]
      const index = newMessages.find((chat: UsersToShow) => {
        return chat.chat?.lastMessage?.chatId === message.chatId
      })
      if (!index || !index.chat) return

      index.chat.lastMessage = message

      if (message.sender !== user._id) {
        index.chat.unread = index.chat.unread?.map(member => {
          if (member.member === user._id) {
            member.amount++
          }
          return member
        })
      }

      newMessages.splice(newMessages.indexOf(index), 1)
      newMessages.unshift(index)
      setChats(newMessages)
      setUsersToShow(newMessages)
    },
    [chats, user?._id]
  )

  useEffect(() => {
    const focusHandler = () => {
      if (chatId) setChatAsRead(chatId)
    }
    window.addEventListener('focus', focusHandler)
    return () => {
      window.removeEventListener('focus', focusHandler)
    }
  }, [chatId, setChatAsRead])

  useEffect(() => {
    socket.current?.on('messageRecieved', (message: IMessage) => {
      updateChats(message)
    })
    const ref = socket.current
    return () => {
      ref?.off('messageRecieved')
    }
  }, [socket, updateChats])

  useEffect(() => {
    if (isLoading) return
    const users = data?.chats.map((chat: IChat) => {
      return {
        userId: chat.members.find((member: string) => member !== user._id),
        chat: chat,
      } as UsersToShow
    })
    console.log(users)
    setChats(users)
    setUsersToShow(users)
  }, [user?._id, data, isLoading])

  useEffect(() => {
    if (usersLoading) return
    const users = usersData
      .map((user: User) => {
        return {
          userId: user._id,
          chat: undefined,
        } as UsersToShow
      })
      .filter((userRegistered: UsersToShow) => {
        return userRegistered.userId !== user?._id
      })
    console.log(users)
    setUsersRegistered(users)
  }, [usersData, usersLoading, user?._id])

  useEffect(() => {
    try {
      socketInitializer()
    } catch (error) {
      console.log(error)
    }

    return () => {
      socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!user) return
    socket.current?.emit('addUser', user._id)
    console.log('addUser')
    socket.current?.on('getUsers', (users: string[]) => {
      const usersIds = users.map((user: any) => user.userId)
      const filteredUsers = usersIds.filter((id: string) => id !== user._id)
      setConnectedUsers(filteredUsers)
    })
  }, [user])

  const socketInitializer = async () => {
    const ws_url = process.env.NEXT_PUBLIC_WB_SERVER_URI as string
    console.log(ws_url)
    socket.current = io(ws_url)
  }

  const showChatsSection = () => {
    console.log(chats)
    setUsersToShow(chats)
  }

  const showUsersRegisteredSection = () => {
    setUsersToShow(usersRegistered)
  }

  return (
    <main className='relative max-w-[1600px] 2xl:w-[calc(100%-38px)] 2xl:top-[19px] 2xl:h-[calc(100%-38px)] mx-auto flex min-w-[768px] h-full'>
      <div className='flex flex-col w-[45%] lg:w-[40%] 2xl:w-1/3 bg-[#101a20] flex-grow overflow-visible min-w-[336.6px]'>
        <ChatlistHeader user={user} />
        <ChatlistSections
          showChatsSection={showChatsSection}
          showUsersRegisteredSection={showUsersRegisteredSection}
        />
        <ListOfChats
          users={usersToShow}
          friendId={friendId}
          setChatAsRead={setChatAsRead}
          showChatsSection={showChatsSection}
        />
      </div>
      {friendId ? (
        <ChatPanel
          socket={socket}
          userId={user._id ?? ''}
          friendId={friendId}
          updateChats={updateChats}
        />
      ) : (
        <div className='w-full border-l border-[#8696a026] flex-grow h-full'>
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-center flex-grow'>
              <h1 className='text-[#8696a0] text-3xl'>Selecciona un chat</h1>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
