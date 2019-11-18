import React from 'react'
import '../../static/styles/main.scss'
import Link from 'next/link'

export default () => {

  return (<div className="flex">
    <div > <img src='../../static/img/error.png' /></div>
    <div className=' m-auto w-4/12 mx-8'>
      <div className=''>
        <div className='text-6xl'> Ups</div>
        <div> Lo sentimos, pero ha ocurrido un error
              inesperado al intentar procesar el archivo
              en el servidor.

              Debido a que este proceso corre en el
              server lamentablemente no contamos
              con información que pueda ayudarle.

              Si ud lo desea puede volver a intentarlo.
              Si el error persiste le recomendamos
              comunicarse con el área de soporte
 </div>
        <Link href='/v/load_file'>
          <div className="flex m-auto mt-8 border rounded-lg border-indigo-500  p-2 w-64">
            <Icon/>
            <span className='text-indigo-500'>Volver a intentarlo </span>
          </div>
        </Link>
      </div>
    </div>

  </div>)
}


const Icon = () => (
  <svg className='mx-4 m-auto'  width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.25 1H2.25C1.91848 1 1.60054 1.1317 1.36612 1.36612C1.1317 1.60054 1 1.91848 1 2.25V12.25C1 12.5815 1.1317 12.8995 1.36612 13.1339C1.60054 13.3683 1.91848 13.5 2.25 13.5H9.75C10.0815 13.5 10.3995 13.3683 10.6339 13.1339C10.8683 12.8995 11 12.5815 11 12.25V4.75L7.25 1Z" stroke="#667EEA" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.25 1V4.75H11" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 11V7.25" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.125 9.125H7.875" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)
