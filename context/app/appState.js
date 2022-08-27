import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  CARGANDO,
  LIMIPAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";
import { useReducer } from "react";
import clienteAxios from "../../config/axios";

const AppState = ({ children }) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const muestraAlerta = msg => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg
    })

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  const subirArchivo = async (formData, nombre_archivo) => {
    dispatch({
      type: CARGANDO
    })
    try {
      const resultado = await clienteAxios.post('/archivos', formData)

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombre_archivo
        }
      })
    } catch (error) {
      console.error(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg
      })
    }
  }

  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_archivo: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    }

    try {
      const resultado = await clienteAxios.post('/enlaces', data)

      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      })
    } catch (error) {
      console.error(error);
    }
  }

  const limpiarState = () => {
    dispatch({
      type: LIMIPAR_STATE
    })
  }

  const agregarPassword = password => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  const agregaNumeroDescargas = descargas => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas
    })
  }

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        muestraAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregaNumeroDescargas
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export default AppState