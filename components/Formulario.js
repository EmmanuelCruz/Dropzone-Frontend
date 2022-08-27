import React, { useState } from 'react'
import useApp from '../hooks/useApp'

const Formulario = () => {

  const [tienePassword, setTienePassword] = useState(false)
  const { agregarPassword, agregaNumeroDescargas } = useApp()

  return (
    <div className='w-full mt-20'>
      <div>
        <label className='text-gray-800 text-lg'>Eliminar tras:</label>
        <select 
          className=' w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
          onChange={e => agregaNumeroDescargas(parseInt(e.target.value))}
        >
          <option value=''>--- Seleccione ---</option>
          <option value='1'>1 descarga</option>
          <option value='5'>5 descargas</option>
          <option value='10'>10 descargas</option>
          <option value='20'>20 descargas</option>
        </select>
      </div>

      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <label className='text-gray-800 text-lg mr-2'>Proteger con contraseña</label>
          <input type='checkbox' onChange={() => setTienePassword(!tienePassword)}/>
        </div>
        {tienePassword && (
          <input
            className='appeareance-none w-full mt-2  bg-white  border border-gray-400  text-black py-3  px-4 pr-8 rounded leading-none focus:outline-none'
            type='password'
            onChange={e => agregarPassword(e.target.value)}
          />
        )}
      </div>
    </div>
  )
}

export default Formulario
