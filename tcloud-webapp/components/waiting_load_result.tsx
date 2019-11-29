import React from 'react'

export enum WaitingStage {
  waiting_send_file_response = 'WAITING SEND FILE RESPONSE ',
  wainting_finish_job = 'WAITING FINISH JOB',
  done = 'DONE'
}

interface Props {
  stage: WaitingStage,
  error_message?: string
}


const renderStatusSendFile = (props: Props) => {
  switch (props.stage) {
    case WaitingStage.waiting_send_file_response:
      if (props.error_message) return <div className='bg-red-400 rounded-full h-20 w-20  m-auto flex'><IconCloud /></div>
      return <div className='h-20 w-20  m-auto flex'> <IconWaiting /></div>
    default:
      return <div className='bg-green-400 rounded-full h-20 w-20  m-auto flex'><IconCloud /></div>
  }
}

const renderStatusConfirmationProcess = (props: Props) => {
  switch (props.stage) {
    case WaitingStage.waiting_send_file_response:
      return <div className='bg-gray-400 rounded-full h-20 w-20  m-auto flex'><IconClock /></div>
    case WaitingStage.wainting_finish_job:
      if (props.error_message) return  <div className='bg-red-400 rounded-full h-20 w-20  m-auto flex'><IconClock /></div>
      return <div className='h-20 w-20  m-auto flex'> <IconWaiting /></div>
    default:
      return <div className='bg-green-400 rounded-full h-20 w-20  m-auto flex'><IconClock /></div>
  }
}

const labelSendFile = 'Enviando el archivo al servidor para ser procesado por el endpoint:  https://ml.leafnoise.io/jobs'

export default (props: Props) => {

  let textColorConfirmationStatus = 'text-gray-500'

  if (props.stage === WaitingStage.wainting_finish_job && props.error_message)
    textColorConfirmationStatus = 'text-red-700'
  else
    textColorConfirmationStatus = 'text-gray-800'

  return <div className='bg-gray-100 h-screen flex'>
    <div className='container'>
      <div className='bg-white flex-1 m-4 rounded-lg shadow-lg px-4 py-8 text-center'>
        {renderStatusSendFile(props)}
        <div className={`m-auto text-xl mt-4 mb-3 `}> {props.stage === WaitingStage.waiting_send_file_response && props.error_message ? 'Error de envio' : 'Enviando Archivo'}</div>
        <div className='m-auto mx-4 text-center'>
          <span className={`m-auto text-base  ${props.stage === WaitingStage.waiting_send_file_response && props.error_message ? 'text-red-700' : 'text-gray-700'} `} >{props.stage === WaitingStage.waiting_send_file_response && props.error_message ? 'No se ha podido enviar el archivo al servidor por un error en el server. Por favor contacte a personal de soporte' : labelSendFile}
          </span>
        </div>

      </div>


      <div className='bg-white flex-1 m-4 rounded-lg shadow-lg px-4 py-8 text-center'>
        {renderStatusConfirmationProcess(props)}
        <div className={`m-auto text-xl mt-4 mb-3 text-center ${props.stage === WaitingStage.waiting_send_file_response ? 'text-gray-500' : 'text-gray-500'}`} > Confirmación de estado </div>
        <div className='m-auto mx-4 text-center'>
          <span className={`m-auto text-base ${textColorConfirmationStatus}`} >Luego del envio se espera confirmación de fin de proceso por parte de server.
  </span>
        </div>
      </div>

    <style jsx>
      {
        `
        @media(min-width: 767px) {
          .container {
            display: flex;
          }
        }
        .container {
          margin: auto;
        }
        `
      }
    </style>
    </div>
  </div>
}

const IconCloud = () => (
  <svg className='m-auto' width="50" height="50" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/cloud-upload">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M26.9995 6.74976C32.8068 6.74976 37.9233 10.487 39.7683 15.851C45.256 16.5958 49.4995 21.3118 49.4995 26.9998C49.4995 29.747 48.5005 32.3908 46.687 34.445C46.2415 34.9468 45.6228 35.2055 44.9995 35.2055C44.4708 35.2055 43.9398 35.021 43.51 34.643C42.5808 33.8173 42.4908 32.3975 43.3143 31.4638C44.401 30.2353 44.9995 28.6468 44.9995 26.9998C44.9995 23.2783 41.971 20.2498 38.2495 20.2498H38.0245C36.9535 20.2498 36.031 19.4938 35.8195 18.443C34.978 14.276 31.27 11.2498 26.9995 11.2498C22.7313 11.2498 19.021 14.276 18.1818 18.443C17.9703 19.4938 17.0455 20.2498 15.9745 20.2498H15.7495C12.028 20.2498 8.99951 23.2783 8.99951 26.9998C8.99951 28.6468 9.59801 30.2353 10.687 31.4638C11.5083 32.3975 11.4205 33.8173 10.489 34.643C9.55751 35.4665 8.13551 35.3743 7.31426 34.445C5.49851 32.3908 4.49951 29.747 4.49951 26.9998C4.49951 21.3118 8.74301 16.5958 14.2308 15.851C16.078 10.487 21.1945 6.74976 26.9995 6.74976ZM25.4363 25.38C26.3228 24.534 27.7245 24.5407 28.5908 25.4092L35.3408 32.1592C36.2205 33.039 36.2205 34.461 35.3408 35.3407C34.902 35.7795 34.326 36 33.75 36C33.174 36 32.598 35.7795 32.1593 35.3407L29.25 32.4315V45C29.25 46.2442 28.242 47.25 27 47.25C25.758 47.25 24.75 46.2442 24.75 45V32.301L21.8138 35.136C20.9205 36.0022 19.4963 35.973 18.6323 35.0797C17.7683 34.1842 17.793 32.7622 18.6863 31.8982L25.4363 25.38Z" fill="white" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="6" width="46" height="42">
        <path id="Mask_2" fill-rule="evenodd" clip-rule="evenodd" d="M26.9995 6.74976C32.8068 6.74976 37.9233 10.487 39.7683 15.851C45.256 16.5958 49.4995 21.3118 49.4995 26.9998C49.4995 29.747 48.5005 32.3908 46.687 34.445C46.2415 34.9468 45.6228 35.2055 44.9995 35.2055C44.4708 35.2055 43.9398 35.021 43.51 34.643C42.5808 33.8173 42.4908 32.3975 43.3143 31.4638C44.401 30.2353 44.9995 28.6468 44.9995 26.9998C44.9995 23.2783 41.971 20.2498 38.2495 20.2498H38.0245C36.9535 20.2498 36.031 19.4938 35.8195 18.443C34.978 14.276 31.27 11.2498 26.9995 11.2498C22.7313 11.2498 19.021 14.276 18.1818 18.443C17.9703 19.4938 17.0455 20.2498 15.9745 20.2498H15.7495C12.028 20.2498 8.99951 23.2783 8.99951 26.9998C8.99951 28.6468 9.59801 30.2353 10.687 31.4638C11.5083 32.3975 11.4205 33.8173 10.489 34.643C9.55751 35.4665 8.13551 35.3743 7.31426 34.445C5.49851 32.3908 4.49951 29.747 4.49951 26.9998C4.49951 21.3118 8.74301 16.5958 14.2308 15.851C16.078 10.487 21.1945 6.74976 26.9995 6.74976ZM25.4363 25.38C26.3228 24.534 27.7245 24.5407 28.5908 25.4092L35.3408 32.1592C36.2205 33.039 36.2205 34.461 35.3408 35.3407C34.902 35.7795 34.326 36 33.75 36C33.174 36 32.598 35.7795 32.1593 35.3407L29.25 32.4315V45C29.25 46.2442 28.242 47.25 27 47.25C25.758 47.25 24.75 46.2442 24.75 45V32.301L21.8138 35.136C20.9205 36.0022 19.4963 35.973 18.6323 35.0797C17.7683 34.1842 17.793 32.7622 18.6863 31.8982L25.4363 25.38Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="50" height="50" fill="white" />
        </g>
      </g>
    </g>
  </svg>

)

const IconClock = () => (
  <svg className='m-auto' width="50" height="50" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/action/alarm_on_24px">
      <path id="icon/action/alarm_on_24px_2" fillRule="evenodd" clipRule="evenodd" d="M17.8751 7.74229L14.9924 4.28674L4.62598 12.9348L7.50845 16.3904L17.8751 7.74229ZM39.0071 4.28811L49.3738 12.9362L46.4911 16.3918L36.1244 7.74366L39.0071 4.28811ZM23.715 32.9058L18.9225 28.1133L16.5375 30.4983L23.6925 37.6533L37.1925 24.1533L34.8075 21.7683L23.715 32.9058ZM26.9999 9.21331C15.8174 9.21331 6.74994 18.2808 6.74994 29.4633C6.74994 40.6458 15.8174 49.7133 26.9999 49.7133C38.1824 49.7133 47.2499 40.6458 47.2499 29.4633C47.2499 18.2808 38.1824 9.21331 26.9999 9.21331ZM11.2499 29.4633C11.2499 38.1483 18.3149 45.2133 26.9999 45.2133C35.6849 45.2133 42.7499 38.1483 42.7499 29.4633C42.7499 20.7783 35.6849 13.7133 26.9999 13.7133C18.3149 13.7133 11.2499 20.7783 11.2499 29.4633Z" fill="white" />
    </g>
  </svg>

)

const IconWaiting = () => (

  <svg style={{ "margin": "auto", "background": "rgb(255, 255, 255)", "display": "block" }} width="96px" height="96px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#e15b64" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round" transform="rotate(258.039 50 50)">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
    </circle>
    <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#667eea" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round" transform="rotate(-258.039 50 50)">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
    </circle>
  </svg>
)