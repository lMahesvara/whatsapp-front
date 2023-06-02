'use client'

import { useState } from 'react'
import Clip from '../../svg/Clip'
import Micro from '../../svg/Micro'
import Smiley from '../../svg/Smiley'
import Send from '@/components/svg/Send'

type ChatFooterProps = {
  handleSend: (message: string) => void
}

const ChatFooter = ({ handleSend }: ChatFooterProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (message: string) => {
    handleSend(message)
    setMessage('')
  }

  return (
    <footer className='p-0 bg-[#202c33] relative w-full min-h-[62px] box-border flex-none z-10 order-3'>
      <div className='px-4 py-[5px] bg-inherit relative flex items-end min-h-[62px] max-w-full w-full'>
        <span className='w-full'>
          {/* wrapper */}
          <div className='flex items-end w-full'>
            {/* options footer chat wrapper */}
            <div className='py-[5px] flex items-center justify-center min-h-[52px] text-[#8696a0] visible transition-all duration-300 ease-in-out gap-[10px]'>
              {/* icons */}
              {/* emojis */}
              <div className='relative flex mx-2 w-[26px] h-[42px]'>
                <button className='relative flex-none block h-full transition-colors duration-300 ease-in-out rounded-full hover:bg-[#ffffff1a] p-2'>
                  <Smiley />
                </button>
              </div>
              {/* clip */}
              <button className='relative flex-none block h-full transition-colors duration-300 ease-in-out rounded-full hover:bg-[#ffffff1a] p-2'>
                <span>
                  <Clip />
                </span>
              </button>
            </div>
            {/* input and micro */}
            <div className='flex items-end flex-1'>
              {/* input */}
              <input
                type='text'
                placeholder='Escribe un mensaje aquí'
                onChange={e => setMessage(e.target.value)}
                value={message}
                className='py-[9px] px-3 my-[5px] mx-2 bg-[#2a3942] border border-[#2a3942] rounded-lg flex-1 min-h-[20x] text-[15px] font-normal leading-5 flex w-full h-full outline-none text-[#d1d7d8]'
              />
              {/* micro */}
              <div className='py-[5px] flex items-center justify-center min-h-[52px] text-[#8696a0] w-10 min-w-[40px]'>
                <button
                  className='flex items-center justify-center w-10 h-10 border-0 cursor-pointer bg-none '
                  onClick={() => {
                    handleSend(message)
                    setMessage('')
                  }}
                >
                  <div className='m-[1px]'>
                    {message ? <Send /> : <Micro />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </span>
      </div>
    </footer>
  )
}

export default ChatFooter
