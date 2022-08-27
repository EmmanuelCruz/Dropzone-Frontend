import React, { useState } from 'react'
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'
import useApp from '../../hooks/useApp'
import Alerta from '../../components/Alerta'

export async function getStaticProps({ params }) {
  const { enlace } = params
  const resultado = await clienteAxios.get(`/enlaces/${enlace}`)

  return {
    props: {
      enlace: resultado.data
    }
  }
}

export async function getStaticPaths() {
  const enlaces = await clienteAxios.get('/enlaces')

  return {
    paths: enlaces.data.enlaces.map(enlace => ({
      params: {
        enlace: enlace.url
      }
    })),
    fallback: false
  }
}

const Enlace = ({ enlace }) => {

  const [tienePassword, setTienePassword] = useState(enlace.password)
  const [password, setPassword] = useState('')

  const { muestraAlerta, mensaje_archivo } = useApp()

  const verificarPassword = async e => {
    e.preventDefault()

    const data = {
      password
    }

    try {
      const resultado = await clienteAxios.post(`/enlaces/${enlace.enlace}`, data)
      setTienePassword(resultado.data.password)
    } catch (error) {
      muestraAlerta(error.response.data.msg);
    }


  }

  return (
    <Layout>
      {
        tienePassword ? (
          <>
            <p>Este enlace está protegido con contraseña. Cólocala a continuación</p>
            {mensaje_archivo && <Alerta />}
            <div className='container mx-auto'>
              <form
                className="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md"
                onSubmit={e => verificarPassword(e)}
              >

                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                  <input
                    type='password'
                    className="shadow appeareance-none border-rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Contraseña del archivo"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <input
                  type='submit'
                  className="bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold p-2 cursor-pointer"
                  value='Validar contraseña'
                />

              </form>
            </div>
          </>
        ) : (
          <>
            <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
            <div className='flex item-center justify-center mt-10'>
              <a href={`${process.env.backendURL}/archivos/${enlace.archivo}`} className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'>Aquí</a>
            </div>
          </>
        )
      }
    </Layout>
  )
}

export default Enlace
