'use client'
import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './footer/ChatFooter'
import { Message } from '@/types/Message'
import { io } from 'socket.io-client'

let socket: any

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('messageRecieve', (message: Message) => {
      console.log(message, messages)

      const newMessages = [...messages, message]

      setMessages(newMessages)
    })
  }, [messages])

  const socketInitializer = async () => {
    socket = io('http://localhost:3002')
  }

  const handleSend = (message: string) => {
    console.log(message)
    const newMessage: Message = {
      text: message,
      createdAt: new Date(),
      sender: 'me',
    }
    setMessages([...messages, newMessage])

    socket.emit('message', newMessage)
  }

  return (
    <div className='w-full border-l border-[#8696a026] flex-grow h-full'>
      <div className='flex flex-col h-full'>
        <ChatHeader />
        <ChatBody messages={messages} />
        <ChatFooter handleSend={handleSend} />
      </div>
    </div>
  )
}

export default ChatPanel
