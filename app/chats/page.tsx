'use client'
import ChatCard from '@/components/chatlist-menu/ChatCard'
import ChatlistHeader from '@/components/chatlist-menu/ChatlistHeader'
import ChatPanel from '@/components/chat-panel/ChatPanel'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export default function Home() {
  const socket = useRef<any>(null)
  const [userId, setUserId] = useState<string>('')
  const [users, setUsers] = useState<string[]>([])
  const [friendId, setFriendId] = useState<string>('')

  useEffect(() => {
    try {
      const id = localStorage.getItem('id') || ''
      setUserId(id)
      socketInitializer()
    } catch (error) {
      console.log(error)
    }

    return () => {
      socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    console.log(userId)
    if (!userId) return
    socket.current?.emit('addUser', userId)
    console.log('addUser')
    socket.current?.on('getUsers', (users: string[]) => {
      const usersIds = users.map((user: any) => user.userId)
      const filteredUsers = usersIds.filter((id: string) => id !== userId)
      setUsers(filteredUsers)
    })
  }, [userId])

  const socketInitializer = async () => {
    socket.current = io('http://localhost:3002')
  }

  const handleFriendId = (id: string) => {
    setFriendId(id)
  }

  return (
    <main className='relative max-w-[1600px] 2xl:w-[calc(100%-38px)] 2xl:top-[19px] 2xl:h-[calc(100%-38px)] mx-auto flex min-w-[768px] h-full'>
      <div className='flex flex-col w-[45%] lg:w-[40%] 2xl:w-1/3 bg-[#101a20] flex-grow overflow-visible min-w-[336.6px]'>
        <ChatlistHeader />
        <div className='relative flex-grow overflow-y-auto'>
          {users?.map((id, i) => (
            <ChatCard key={id} i={i} id={id} handleFriendId={handleFriendId} />
          ))}
        </div>
      </div>
      {friendId ? (
        <ChatPanel socket={socket} userId={userId} friendId={friendId} />
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
