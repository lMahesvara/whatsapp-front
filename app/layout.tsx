import SessionProviderLayout from '@/components/session/SessionProviderLayout'
import './globals.css'

export const metadata = {
  title: 'Whatsapp Clone',
  description: 'Whatsapp Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProviderLayout>{children}</SessionProviderLayout>
      </body>
    </html>
  )
}
