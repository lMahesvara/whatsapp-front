import React from 'react'

const ChatlistHeader = () => {
  return (
    <header className='relative flex items-center justify-end w-full px-4 bg-[#202c33] py-2.5 '>
      <div className='flex-1'>
        <div className='relative w-10 h-10 rounded-full cursor-pointer'>
          <img
            className='w-full h-full rounded-full'
            src='https://picsum.photos/200/300'
            alt='profile'
          />
        </div>
      </div>
    </header>
  )
}

export default ChatlistHeader
