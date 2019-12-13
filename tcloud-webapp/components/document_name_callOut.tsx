import React, {useState} from 'react'

interface Props {
  value: string
  handler: any
  show: boolean
  setShow: any
  lastCall: any
}

export default (props: Props) => {
  const [error,setError] = useState(null)

  return <div className="h-screen bg-gray-100 flex " >
    <div className="flex-cols justify-center m-auto bg-white rounded-lg h-64 w-1/3">
      <div className="mt-12"><label className="flex text-base font-bold mx-8">¿Cómo querés identificar a este documento?</label></div>
      <input 
        value={props.value}
        onChange={e => props.handler(e.target.value)}
        className={`mt-4 bg-white focus:outline-none focus:shadow-outline border ${!error ? 'border-gray-300' : 'border-red-300'} rounded-lg py-2 px-4 block w-2/3 appearance-none leading-normal mx-8`} 
        max="150" 
        placeholder="Escriba una frase de referencia aquí" />
      <footer className="flex mx-8 my-4" >
        <button className="border rounded-lg px-8 py-2 text-sm font-semibold text-indigo-500" onClick={ () => {
          props.setShow(false)
        }}>Cancelar</button>
        <button className="rounded-lg ml-4 px-8 py-2 bg-indigo-500 text-white  text-sm font-semibold " onClick={ () => {
          if (!props.value){
            setError('Debe Especificar al menos una referencia')
            return
          }

          props.setShow(false)
          props.lastCall()
        }}>Siguiente</button>
      </footer>
    </div>
  </div>
}