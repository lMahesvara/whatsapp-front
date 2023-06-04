import React from 'react'
import Login from './Login'

const LoginPage = () => {
  return (
    <section className='p-6 min-h-wNav bg-bgColor md:py-20 md:min-h-full'>
      <div className='md:mx-auto md:max-w-sm md:bg-[#243742] md:px-6 py-10 rounded-[32px]'>
        <h2 className='text-[20px] leading-6 tracking-[-0.165px] text-white font-semibold'>
          Iniciar sesión
        </h2>
        <Login />
      </div>
    </section>
  )
}

export default LoginPage
