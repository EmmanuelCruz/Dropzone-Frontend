import Layout from "../components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'
import useAuth from "../hooks/useAuth"
import Alerta from '../components/Alerta'
import { useEffect } from "react"
import { useRouter } from "next/router"

const Login = () => {
  
  const { iniciarSesion, mensaje, autenticado } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(autenticado){
      router.push('/')
    }
  }, [autenticado])

  const formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: valores => {
      iniciarSesion(valores)
    }
  })

  return (
    <Layout>
      <div className="md:w-4/5 xl_w-3/5 m-auto mb-32">

        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Login</h2>

        {mensaje && <Alerta />}

        <div className="flex justify-center mt-5">
          <div className="max-w-lg w-full">
            <form 
              className="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input 
                  type='text'
                  className="shadow appeareance-none border-rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email del usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                />
                { formik.touched.email && formik.errors.email && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input 
                  type='password'
                  className="shadow appeareance-none border-rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Password del usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                />
                { formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>

              <input 
                type='submit'
                className="bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold p-2 cursor-pointer"
                value='Iniciar sesión'
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
