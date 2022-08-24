import useAuth from '../hooks/useAuth'

const Alerta = () => {

  const { mensaje } = useAuth()

  return (
    <div className='py-2 w-full bg-red-500 px-3 my-3 max-w-lg text-center text-white mx-auto'>
      {mensaje}
    </div>
  )
}

export default Alerta
