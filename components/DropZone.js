import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '../config/axios'

const DropZone = () => {

  const onDrop = useCallback( async (acceptedFiles) => {

    // Ceando formdata
    const formData = new FormData()
    formData.append('archivo', acceptedFiles[0])

    const resultado = await clienteAxios.post('/archivos', formData)

    console.log(resultado.data)
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop})
  
  const archivos = acceptedFiles.map(archivo => (
    <li className='bg-white flex-1 p-3 mb-4 shadow-lg rounded' key={archivo.lastModified}>
      <p className='font-bold text-xl'>{archivo.path}</p>
      <p className='text-sm text-gray-500'>{archivo.size} bytes</p>
    </li>
  ))


  return (
    <div className='md:flex-1 mb-3 mx-2  mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100'>
      <ul>
        {archivos}
      </ul>
      <div {...getRootProps({ className: 'dropzone w-full py-32'})}>
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
    </div>
  )
}

export default DropZone
