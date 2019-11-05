import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';


const ButtonEvaluar = () => {


  return <div className="bg-indigo-500 buttonEvaluar mt-4 rounded-lg hover:bg-indigo-700 mb-4 ">
    <div> <IconCheck /></div>
    <div className=" text-sm font-semibold  text-white">Evaluar </div>
    <div> </div>

    <style jsx>
      {
        `
        .buttonEvaluar {
          height: 32px;
          width: 136px;
          display: grid; 
          grid-template-columns: 1fr 2fr 1fr
        }

        svg {
          display: inline-block;
          vertical-align: middle;
        }
        `
      }
    </style>
  </div>
}



export default () => {

  const transactionInfo = useSelector(state => state.documentViewer.document.transaction_info)


  return <div className="bg-indigo-100 mt-b  ">
    <div className="h-full bg-white  ml-2 pl-4">
      <div className="border-b   ">

        <ul className='mt-4 mb-2 flex pt-4 '>
          <div className="bg-indigo-100 rounded-lg w-8 h-8    flex content-center justify-center"  ><IconClose /></div>
          <div className='text-sm font-semibold text-gray-600   flex content-center justify-center ml-4 '>Cerrar Info</div>
        </ul >
        <ul className=" mb-2 flex">
          <div className="bg-indigo-100 rounded-lg w-8 h-8 flex content-center justify-center"><IconNotification /></div>
          <div className='text-sm font-semibold text-gray-600 flex content-center justify-center  ml-4'>Notificaciones</div>
        </ul>
        <ul className=" mb-2 flex">
          <div className="bg-indigo-100 rounded-lg w-8 h-8 flex content-center justify-center"><IconPeople/></div>
          <div className='text-sm font-semibold text-gray-600 flex content-center justify-center  ml-4'>Usuario</div>
        </ul>

      </div>
      <div className="border-b mt-4">
        <header className="text-base font-semibold  py-4"> Información general </header>
        <article>
          <ul className="mt-2">
            <li className="text-sm font-semibold">Nombre de archivo</li>
            <p className="text-sm text-gray-600">{transactionInfo.file.name}</p>
          </ul>
          <ul className="mt-2" >
            <li className="text-sm font-semibold">Fecha de subida</li>
            <p className="text-sm text-gray-600">{moment(transactionInfo.request_by.requested_at * 1000).format('Do MMM YYYY HH:mma')}</p>
          </ul>
          <ul className="mt-2">
            <li className="text-sm font-semibold">% de legibilidad</li>
            <p className="text-sm text-gray-600">{transactionInfo.file.global_health_accuracy}%</p>
          </ul>
          <ButtonEvaluar />
        </article>
      </div>
      <div className="border-b"></div>
    </div>
    <style jsx>
      {
        `
          .menu {
              display: grid;
              grid-template-rows: 150px 312px 60%
          }

          
        
          li::before {
            content: "•"; 
            color: #667EEA;
            display: inline-block; 
            font-size: 1.5em; 
            width: 0.8em;
          }
        `
      }
    </style>
  </div>
}

const IconClose = () => (
  <svg style={{ margin: 'auto' }} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12L12 1" stroke="#667EEA" stroke-width="1.69231" />
    <path d="M12 12L1 1" stroke="#667EEA" stroke-width="1.69231" />
  </svg>

)

const IconNotification = () => (
  <svg style={{ margin: 'auto' }} width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.8145 5.52857C11.8145 4.42458 11.3703 3.3658 10.5797 2.58516C9.78915 1.80453 8.71689 1.36597 7.59883 1.36597C6.48078 1.36597 5.40852 1.80453 4.61793 2.58516C3.82735 3.3658 3.3832 4.42458 3.3832 5.52857C3.3832 10.3849 1.27539 11.7725 1.27539 11.7725H13.9223C13.9223 11.7725 11.8145 10.3849 11.8145 5.52857Z" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.8148 14.5476C8.69128 14.7579 8.51398 14.9324 8.30065 15.0537C8.08733 15.1751 7.84547 15.2389 7.59929 15.2389C7.35312 15.2389 7.11126 15.1751 6.89794 15.0537C6.68461 14.9324 6.50731 14.7579 6.38379 14.5476" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)

const IconCheck = () => (
  <svg style={{ margin: 'auto' }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="15" height="15" rx="2.11111" fill="#E5E9FA" />
    <path d="M10.5 3.75L5.85 8.86363L4.5 7.84113H3.75L5.85 11.25L11.25 3.75H10.5Z" fill="#5E81F4" />
  </svg>

)

const IconPeople = () => (
  <svg  style={{ margin: 'auto' }}  width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/person">
      <path id="Mask" fill-rule="evenodd" clip-rule="evenodd" d="M14 7C14 5.897 13.103 5 12 5C10.897 5 10 5.897 10 7C10 8.103 10.897 9 12 9C13.103 9 14 8.103 14 7ZM16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20C19 20.552 18.553 21 18 21C17.447 21 17 20.552 17 20C17 17.243 14.757 15 12 15C9.243 15 7 17.243 7 20C7 20.552 6.553 21 6 21C5.447 21 5 20.552 5 20Z" fill="#231F20" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="14" height="18">
        <path id="Mask_2" fill-rule="evenodd" clip-rule="evenodd" d="M14 7C14 5.897 13.103 5 12 5C10.897 5 10 5.897 10 7C10 8.103 10.897 9 12 9C13.103 9 14 8.103 14 7ZM16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20C19 20.552 18.553 21 18 21C17.447 21 17 20.552 17 20C17 17.243 14.757 15 12 15C9.243 15 7 17.243 7 20C7 20.552 6.553 21 6 21C5.447 21 5 20.552 5 20Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="24" height="24" fill="#5E81F4" />
        </g>
      </g>
    </g>
  </svg>

)