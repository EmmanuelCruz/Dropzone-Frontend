import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '../config/axios'
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'
import Formulario from './Formulario'

const DropZone = () => {

  const { muestraAlerta, subirArchivo, cargando, crearEnlace } = useApp()
  const { autenticado } = useAuth()

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // Ceando formdata
    const formData = new FormData()
    formData.append('archivo', acceptedFiles[0])
    subirArchivo(formData, acceptedFiles[0].path)
  }, [])

  const onDropRejected = () => {
    muestraAlerta('No se pudo subir el archivo. El límite es de 1MB. Obtén una cuenta gratis para subir archivos más grandes')
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

  const archivos = acceptedFiles.map(archivo => (
    <li className='bg-white flex-1 p-3 mb-4 shadow-lg rounded' key={archivo.lastModified}>
      <p className='font-bold text-xl'>{archivo.path}</p>
      <p className='text-sm text-gray-500'>{archivo.size} bytes</p>
    </li>
  ))

  return (
    <div className='md:flex-1 mb-3 mx-2  mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100'>

      {acceptedFiles.length > 0 ? (
        <div className='mt-10 w-full'>
          <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
          <ul>
            {archivos}
          </ul>

          {
            autenticado && <Formulario />
          }

          {cargando ? (
            <p>Cargando...</p>
          ): (
            <button
              type='button'
              className='bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800'
              onClick={() => crearEnlace()}
            >Crear enlace</button>
          )}

        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input
            className='h-100'
            {...getInputProps()}
          />
          {isDragActive ? (
            <p className='text-2xl text-center text-gray-600'>Suelta el archivo</p>
          ) : (
            <div className='text-center'>
              <p className='text-2xl text-center text-gray-600'>Seleccion un arrivo o arrastralo aquí</p>
              <button className='bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800' type='button'>Selecciona archivos para subir</button>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default DropZone
