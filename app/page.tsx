'use client'
import LoginSkeleton from '@/components/skeletons/LoginSkeleton'
import Github from '@/components/svg/Github'
import Google from '@/components/svg/Google'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className='flex justify-center h-screen py-20 '>
        <LoginSkeleton />
      </div>
    )
  }
  if (status === 'authenticated') {
    return router.push('/chats')
  }

  return (
    <main>
      <div className='relative py-16 bg-transparent'>
        <div className='container relative px-6 m-auto text-white md:px-12 xl:px-40 md:w-8/12 lg:w-6/12 xl:w-6/12 bg-[#202c33] shadow-xl rounded-xl p-6 sm:p-16'>
          <h2 className='mb-8 text-3xl font-bold text-white'>Iniciar Sesión</h2>
          <div className='grid mt-16 space-y-4'>
            <button
              className='h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-[#005c4b] '
              onClick={() => signIn('google', { callbackUrl: '/chats' })}
            >
              <div className='relative flex items-center justify-center space-x-4'>
                <Google />
                <span className='block text-sm font-semibold tracking-wide text-white transition duration-300 w-max group-hover:text-[#00a884] sm:text-base'>
                  Continuar con Google
                </span>
              </div>
            </button>
            <button
              className='h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-[#005c4b] '
              onClick={() => signIn('github', { callbackUrl: '/chats' })}
            >
              <div className='relative flex items-center justify-center space-x-4'>
                <Github />
                <span className='block text-sm font-semibold tracking-wide text-white transition duration-300 w-max group-hover:text-[#00a884] sm:text-base'>
                  Continuar con Github
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
