type ChatlistSectionsProps = {
  showUsersRegisteredSection: () => void
  showChatsSection: () => void
}

const ChatlistSections = ({
  showUsersRegisteredSection,
  showChatsSection,
}: ChatlistSectionsProps) => {
  return (
    <section className='relative flex items-center text-white justify-evenly py-2 px-4 bg-[#202c33] border-y border-[#8696a026]'>
      <div className='rounded-lg hover:bg-[#8696a026] px-2 py-1'>
        <button onClick={showChatsSection}>Chats</button>
      </div>
      <div className='rounded-lg hover:bg-[#8696a026] px-2 py-1'>
        <button onClick={showUsersRegisteredSection}>Users</button>
      </div>
    </section>
  )
}

export default ChatlistSections
