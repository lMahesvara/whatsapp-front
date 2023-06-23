'use client'
import { SessionProvider } from 'next-auth/react'

const SessionProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider basePath='api/auth'>{children}</SessionProvider>
}

export default SessionProviderLayout
