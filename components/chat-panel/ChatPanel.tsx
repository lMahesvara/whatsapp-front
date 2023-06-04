'use client'
import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './footer/ChatFooter'
import { Socket, io } from 'socket.io-client'
import useSWR from 'swr'
import { getChat, postMessage } from '@/services/api'
import { Message } from '@/types/Message'

type ChatPanelProps = {
  socket: React.MutableRefObject<Socket | null>
  userId: string
  friendId: string
}

const ChatPanel = ({ socket, userId, friendId }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([])

  const { data, isLoading } = useSWR(`/api/chats/${userId}/${friendId}`, () =>
    getChat(userId, friendId)
  )

  const { chat, messages: messagesFetched } = data ?? {}

  useEffect(() => {
    socket.current?.on('messageRecieve', (message: Message) => {
      console.log(message, messages)

      const newMessages = [...messages, message]

      setMessages(newMessages)
    })
  }, [messages, socket])

  useEffect(() => {
    if (messagesFetched) {
      setMessages(messagesFetched)
    }
  }, [messagesFetched])

  const handleSend = async (message: string) => {
    console.log(message)
    const newMessage: Message = {
      text: message,
      createdAt: new Date(),
      sender: userId,
      chatId: chat?._id,
    }
    const postedMessage = (await postMessage(newMessage)) as Message

    console.log(postedMessage)

    setMessages([...messages, postedMessage])

    socket.current?.emit('message', postedMessage)
  }

  if (isLoading)
    return (
      <div className='w-full border-l border-[#8696a026] flex-grow h-full'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-center flex-grow'>
            <h1 className='text-[#8696a0] text-3xl'>Loading...</h1>
          </div>
        </div>
      </div>
    )

  return (
    <div className='w-full border-l border-[#8696a026] flex-grow h-full'>
      <div className='flex flex-col h-full'>
        <ChatHeader id={friendId} />
        <ChatBody messages={messages} id={userId} />
        <ChatFooter handleSend={handleSend} />
      </div>
    </div>
  )
}

export default ChatPanel
