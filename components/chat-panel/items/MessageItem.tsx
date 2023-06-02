import TailOut from '@/components/svg/TailOut'
import React from 'react'
import Check from './check/Check'
import MessageLayout from './MessageLayout'
import { Message } from '@/types/Message'

type MessageItemProps = {
  message?: Message
  lastMessage?: boolean
}

const MessageItem = ({ message, lastMessage }: MessageItemProps) => {
  const marginBottom = lastMessage ? 'mb-3' : 'mb-0.5'

  return (
    <MessageLayout marginBottom={marginBottom}>
      <span className='-right-2 text-[#005c4b] absolute top-0 z-30 w-2 h-[13px] block'>
        <TailOut />
      </span>
      <div className='relative block break-words whitespace-pre-wrap'>
        <span>{message?.text}</span>
        <span className='px-1 pb-0 text-[.6875rem] align-middle invisible inline-flex h-0'>
          <span className='w-[19px] flex-shrink-0 flex-grow-0'></span>
          <span className='flex-grow-0 flex-shrink-0'>6:34 p. m.</span>
        </span>
      </div>
      <div className='ml-1 mr-0 z-10 relative float-right -mb-[5px] -mt-2.5'>
        <div className='flex cursor-pointer text-[0.6875rem] whitespace-nowrap items-center h-[15px] leading-[15px]'>
          <span className='inline-block align-top'>6:34 p. m.</span>
          <Check />
        </div>
      </div>
    </MessageLayout>
  )
}

export default MessageItem
