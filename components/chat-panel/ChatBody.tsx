'use client'
import { useEffect, useRef } from 'react'
import MessageItem from './items/MessageItem'
import ResMessageItem from './items/ResMessageItem'
import { Message } from '@/types/Message'

type ChatBodyProps = {
  messages?: Message[]
  id: string
}

const ChatBody = ({ messages, id }: ChatBodyProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  console.log(messages)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [])

  return (
    <section
      className='flex-1 bg-[#0B141A] relative order-2 block w-full h-full overflow-x-hidden overflow-y-scroll'
      ref={containerRef}
    >
      {/* separador */}
      <div className='flex-1 min-h-[12px] '></div>

      {messages?.map((message, index) => {
        const prevMessage = messages[index - 1]
        const nextMessage = messages[index + 1]

        const firstMessage =
          !prevMessage || prevMessage.sender !== message.sender
        const lastMessage =
          !nextMessage || nextMessage.sender !== message.sender
        return message.sender === id ? (
          <MessageItem
            key={index}
            message={message}
            firstMessage={firstMessage}
            lastMessage={lastMessage}
          />
        ) : (
          <ResMessageItem
            key={index}
            message={message}
            firstMessage={firstMessage}
            lastMessage={lastMessage}
          />
        )
      })}
    </section>
  )
}

export default ChatBody
