import { useEffect } from "react"
import Layout from "../components/Layout"
import useAuth from "../hooks/useAuth"
import Link from 'next/link'
import DropZone from "../components/DropZone"

export default function Home() {

  const { usuarioAutenticado } = useAuth()

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white py-10 rounded-lg">
          <div className="md:flex-1 mb-3 mt-16 mx-2 lg:mt-0 ">
            <DropZone />
          </div>
          <div className="md:flex-1 mb-3 mt-16 mx-2 lg:mt-0 ">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos de forma fácil y segura
            </p>
            <Link href='/crear-cuenta'>
              <a className="text-red500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
