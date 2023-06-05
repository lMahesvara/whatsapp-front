type MessageLayoutProps = {
  marginBottom?: string
  bgColor?: string
  children: React.ReactNode
  firstMessage?: boolean
}

const MessageLayout = ({
  marginBottom,
  bgColor = 'bg-[#005c4b]',
  children,
  firstMessage,
}: MessageLayoutProps) => {
  const styles =
    firstMessage &&
    (bgColor === 'bg-[#005c4b]' ? `rounded-tr-none ` : `rounded-tl-none `)
  const itemsAlign = bgColor === 'bg-[#005c4b]' ? 'items-end' : 'items-start'
  return (
    <article
      className={`pl-6 pr-4 lg:px-[63px] flex items-start flex-col ${marginBottom} ${itemsAlign}`}
    >
      <div
        className={`mb-0 rounded-[7.5px]  max-w-[95%] lg:max-w-[75%] 2xl:max-w-[60%] relative flex-none text-sm text-[#e9edef] pl-[9px] pr-[7px] pb-2 pt-1.5 box-border ${bgColor} ${styles}`}
      >
        {children}
      </div>
    </article>
  )
}

export default MessageLayout
