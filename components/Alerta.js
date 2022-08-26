import useAuth from '../hooks/useAuth'
import useApp from '../hooks/useApp'

const Alerta = () => {

  const { mensaje } = useAuth()
  const { mensaje_archivo } = useApp()

  return (
    <div className='py-2 w-full bg-red-500 px-3 my-3 max-w-lg text-center text-white mx-auto'>
      {mensaje || mensaje_archivo}
    </div>
  )
}

export default Alerta
