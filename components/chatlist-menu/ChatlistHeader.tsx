import { User } from '@/types/User'
import { signOut } from 'next-auth/react'
import React from 'react'

const ChatlistHeader = ({ user }: { user: User }) => {
  return (
    <header className='relative flex items-center justify-end w-full px-4 bg-[#202c33] py-2.5 '>
      <div className='flex-1'>
        <div className='relative w-10 h-10 rounded-full cursor-pointer'>
          <img
            className='w-full h-full rounded-full'
            src={user?.image ?? 'https://picsum.photos/200/300'}
            alt='profile'
          />
        </div>
      </div>
      <button
        className='text-lg text-white hover:text-[#34d3b0] transition duration-300 ease-in-out cursor-pointer'
        onClick={() => signOut()}
      >
        Log out
      </button>
    </header>
  )
}

export default ChatlistHeader
