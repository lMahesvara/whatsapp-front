'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const { email, password } = data

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const json = await res.json()

      if (!res.ok) {
        console.log(json)
        return
      }

      localStorage.setItem('id', json.id)
      router.push('/chats')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='flex flex-col mt-8' onSubmit={handleSubmit}>
      <div className='flex flex-col mb-6'>
        <label
          htmlFor='email'
          className='mb-1 text-xs tracking-wide text-gray-200 sm:text-sm'
        >
          Correo electrónico
        </label>
        <div className='relative'>
          <div className='absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400'>
            <svg
              className='w-6 h-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M20 12H4'></path>
              <path d='M12 20L4 12L12 4'></path>
            </svg>
          </div>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Correo electrónico'
            className='w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-lg sm:text-base focus:outline-none focus:border-blue-400'
          />
        </div>
      </div>
      <div className='flex flex-col mb-6'>
        <label
          htmlFor='password'
          className='mb-1 text-xs tracking-wide text-gray-200 sm:text-sm'
        >
          Contraseña
        </label>
        <div className='relative'>
          <div className='absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400'>
            <span>
              <svg
                className='w-6 h-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M20 12H4'></path>
                <path d='M12 20L4 12L12 4'></path>
              </svg>
            </span>
          </div>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Contraseña'
            className='w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-lg sm:text-base focus:outline-none focus:border-blue-400'
          />
        </div>
      </div>
      <div className='flex items-center mb-6 -mt-4'>
        <div className='flex ml-auto'>
          <Link
            href='/forgot-password'
            className='inline-flex text-xs text-blue-500 sm:text-sm hover:text-blue-700'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
      <div className='flex w-full'>
        <button
          type='submit'
          className='flex items-center justify-center w-full py-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded focus:outline-none sm:text-base hover:bg-blue-600'
        >
          <span className='mr-2 uppercase'>Iniciar sesión</span>
          <span>
            <svg
              className='w-6 h-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M17 8L12 3L7 8'></path>
              <path d='M17 16L12 21L7 16'></path>
              <path d='M12 3V15'></path>
            </svg>
          </span>
        </button>
      </div>
    </form>
  )
}

export default Login
