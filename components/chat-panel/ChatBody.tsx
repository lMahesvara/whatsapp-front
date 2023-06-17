'use client'
import { Fragment, useEffect, useRef } from 'react'
import MessageItem from './items/MessageItem'
import ResMessageItem from './items/ResMessageItem'
import { IMessage } from '@/types/Message'
import { getDateFormat, isDifferentDay } from '@/utils/timeFormat'
import DateItem from './items/DateItem'
import UnreadMsg from './items/UnreadMsg'
import { IChat } from '@/types/Chat'

type ChatBodyProps = {
  messages?: IMessage[]
  id: string
  chat: IChat
}

const ChatBody = ({ messages, id, chat }: ChatBodyProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

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

        let dateItem = null
        if (isDifferentDay(messages[index - 1]?.createdAt, message.createdAt)) {
          const dateFormated = getDateFormat({
            date: message.createdAt,
            showToday: true,
          })
          dateItem = <DateItem date={dateFormated} key={message._id + 'date'} />
        }

        let unreadItem = null
        const amount =
          chat.unread.find(unread => unread.member === id)?.amount ?? 0

        if (amount === messages.length - index) {
          unreadItem = (
            <UnreadMsg amount={amount} key={message._id + 'unread'} />
          )
        }

        console.log(amount, messages.length - index, chat.unread)

        return message.sender === id ? (
          <Fragment key={message._id + 'fragment'}>
            {dateItem}
            <MessageItem
              key={message._id + 'm'}
              message={message}
              firstMessage={firstMessage}
              lastMessage={lastMessage}
            />
          </Fragment>
        ) : (
          <Fragment key={message._id + 'fragment'}>
            {dateItem}
            {unreadItem}
            <ResMessageItem
              key={message._id + 'r'}
              message={message}
              firstMessage={firstMessage}
              lastMessage={lastMessage}
            />
          </Fragment>
        )
      })}
    </section>
  )
}

export default ChatBody
