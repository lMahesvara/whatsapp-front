import React from 'react'
import ContentLoader from 'react-content-loader'

const ChatCardSkeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={350}
    height={72}
    viewBox='0 0 350 72'
    backgroundColor='#c4c4c4'
    foregroundColor='#969696'
    {...props}
  >
    <circle cx='40' cy='40' r='24' />
    <rect x='75' y='24' rx='2' ry='2' width='70' height='9' />
    <rect x='75' y='45' rx='2' ry='2' width='140' height='9' />
  </ContentLoader>
)

export default ChatCardSkeleton
