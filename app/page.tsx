import ChatCard from '@/components/chatlist-menu/ChatCard'
import ChatHeader from '@/components/chat-panel/ChatHeader'
import ChatlistHeader from '@/components/chatlist-menu/ChatlistHeader'
import ChatFooter from '@/components/chat-panel/footer/ChatFooter'
import ChatBody from '@/components/chat-panel/ChatBody'
import ChatPanel from '@/components/chat-panel/ChatPanel'

export default function Home() {
  return (
    <main className='relative max-w-[1600px] 2xl:w-[calc(100%-38px)] 2xl:top-[19px] 2xl:h-[calc(100%-38px)] mx-auto flex min-w-[768px] h-full'>
      <div className='flex flex-col w-[45%] lg:w-[40%] 2xl:w-1/3 bg-[#101a20] flex-grow overflow-visible min-w-[336.6px]'>
        <ChatlistHeader />
        <div className='relative flex-grow overflow-y-auto'>
          {Array(20)
            .fill('')
            .map((_, i) => (
              <ChatCard key={i} i={i} />
            ))}
        </div>
      </div>
      <ChatPanel />
    </main>
  )
}
