import React from 'react'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { usuario, cerrarSesion } = useAuth()

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/' >
        <a>
          <img className='w-64 mb-8 md:mb-0' src='logo.svg'/>
        </a>
      </Link>

      {usuario ? (
        <div className='flex items-center'>
          <p className='mr-2'>Hola {usuario.nombre}</p>
          <button 
            type='button'
            className='bg-black px-5 py-3 text-white font-bold uppercase rounded-lg '
            onClick={() => cerrarSesion()}
          >Cerrar sesión</button>
        </div>
      ): (
        <>
          <Link href='/login'>
            <a className='bg-red-500 px-5 py-3 text-white font-bold uppercase rounded-lg mr-2'>Iniciar sesión</a>
          </Link>
          <Link href='/crear-cuenta'>
            <a className='bg-black px-5 py-3 text-white font-bold uppercase rounded-lg '>Crear cuenta</a>
          </Link>
        </>
      )}

      <div>
      </div>
    </header>
  )
}

export default Header
