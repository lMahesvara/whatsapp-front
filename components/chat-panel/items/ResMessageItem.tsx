import TailIn from '@/components/svg/TailIn'
import React from 'react'
import MessageLayout from './MessageLayout'
import { Message } from '@/types/Message'
import { getTimeFormat } from '@/utils/timeFormat'

type ResMessageItemProps = {
  message?: Message
  lastMessage?: boolean
}

const ResMessageItem = ({ message, lastMessage }: ResMessageItemProps) => {
  const marginBottom = lastMessage ? 'mb-3' : 'mb-0.5'
  const bgColor = 'bg-[#202c33]'
  const time = getTimeFormat(message?.createdAt as Date)

  return (
    <MessageLayout marginBottom={marginBottom} bgColor={bgColor}>
      <span className='-left-2 text-[#202c33] absolute top-0 z-30 w-2 h-[13px] block'>
        <TailIn />
      </span>
      <div className='relative block break-words whitespace-pre-wrap'>
        <span>{message?.text}</span>
        <span className='px-1 pb-0 text-[.6875rem] align-middle invisible inline-flex h-0'>
          <span className='flex-grow-0 flex-shrink-0'>{time}</span>
        </span>
      </div>
      <div className='ml-1 mr-0 z-10 relative float-right -mb-[5px] -mt-2.5'>
        <div className='flex cursor-pointer text-[0.6875rem] whitespace-nowrap items-center h-[15px] leading-[15px]'>
          <span className='inline-block align-top text-[#ffffff99]'>
            {time}
          </span>
        </div>
      </div>
    </MessageLayout>
  )
}

export default ResMessageItem
