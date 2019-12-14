import React, { useEffect, useState } from 'react'
import '../../static/styles/main.scss'
//import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'

enum TabActive {
  processed="PROCESSED",
  pending = "PENDING",
  withError = "WITHERROR"
}


const FORMAT_DATETIME= "DD-MM-YYYY hh:mm:ss A"

export default () => {

  const [documents,setDocuments] =useState(null)
  const [tabActive, setTabActive] = useState<TabActive>(TabActive.processed)
  const [documentsInProces, setDocumentsInProcess] = useState(null)
  const [lastUpdate, setLastUpdate] = useState<number>(null)

  const tabSelectedStyle = 'bg-indigo-500 px-8 py-2 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700'
  const tabNotSelectedStyle='border border-indigo-500 px-8 py-2 rounded-lg text-sm font-semibold text-indigo-500 hover:border-indigo-700 hover:text-indigo-700'
  
  useEffect(() => {
    /*
    axios.get("https://us-central1-tcloud-261610.cloudfunctions.net/getMeta")
      .then( docs => {
        setDocuments(docs.data.docs)
        axios.get('https://us-central1-tcloud-261610.cloudfunctions.net/getDocumentsPendingToProcess ')
          .then( docs => setDocumentsInProcess(docs.data.docs))
      })*/


      var myWorker = new Worker("/worker.js");

      myWorker.onmessage = function (oEvent) {
        console.log(oEvent.data)
        setLastUpdate(oEvent.data.runAt)
        switch(oEvent.data.type) {
          case 'DOCUMENT_PROCESSED_LIST':
              setDocuments(oEvent.data.value.docs)
          case 'DOCUMENT_IN PROGRESS_LIST':
              setDocumentsInProcess(oEvent.data.value.docs)
          default: 
            return 
        }
        console.log(oEvent.data);
      };

      myWorker.postMessage({
        type: 'INIT'
      });
  }, [])


  if (!documents) return <div>Cargando</div>

  // console.log(tabActive)

  return (<div className="flex">
    <main className="w-full clearfix ">
      <header className="h-16 flex items-center">
        <input max="320" className="bg-gray-300 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mx-4 py-2 px-4 block w-1/3 appearance-none leading-normal" placeholder="¿Qué documento desea buscar?" />
      </header>

      <article className="h-screen bg-gray-200 shadow">
        <div className="mx-4 flex items-center m-auto pt-4 relative">
          <button className={`${tabActive === TabActive.processed ? tabSelectedStyle : tabNotSelectedStyle}`} onClick={ () => setTabActive(TabActive.processed)}>Procesados</button>
          <button className={`ml-4 ${tabActive === TabActive.pending ? tabSelectedStyle : tabNotSelectedStyle}`}  onClick={ () => setTabActive(TabActive.pending)}>En Proceso</button>
          <button className={`ml-4 ${tabActive === TabActive.withError ? tabSelectedStyle : tabNotSelectedStyle}`}   onClick={ () => setTabActive(TabActive.withError)}>Con Errores</button>
          <div className="absolute right-0">
              <label className='text-gray-500 text-base text-xs font-thin' >Ultima Actualización {moment(lastUpdate).format('h:mm:ssA')}</label>
          </div>
        </div>


        


       {tabActive === TabActive.processed ? <div>
        <header className="flex pt-8 mx-4">
          <div className="w-2/3">
            <span className="text-gray-500 font-semibold text-sm">Identificador</span>
          </div>
          <div className="w-32">
            <span className="text-gray-500 font-semibold text-sm">Estado</span>
          </div>
          <div className="w-64">
            < span className="text-gray-500 font-semibold text-sm">Fecha de subida</span>
          </div>
          <div className="w-32">
            <span className="text-gray-500 font-semibold text-sm">Descarga</span>
          </div>
        </header>

        {documents.map( d => (
          <div className="flex bg-white mx-4 h-12 items-center mt-4 rounded-lg hover:bg-green-200 hover:shadow" key={d.document_id}>
            <div className="w-2/3 pl-4">
              <Link href={`/v?documentId=${d.document_id}`}>
                <span className="text-gray-700 font-semibold text-sm">{d.reference}</span>
              </Link>
            </div>
            <div className="w-32">
              <span className="text-gray-500 font-semibold text-sm">{d.status === 'SUCCESS' ? 'Procesado' : 'Falló'}</span>
            </div>
            <div className="w-64">
              <span className="text-gray-700 font-semibold text-sm">{moment(d.processed_at).format(FORMAT_DATETIME)}</span>
            </div>
            <div className="w-32">
              <span className="text-gray-800 font-semibold text-sm"><IconDownload /></span>
            </div>
          </div>
        ))}
        </div> : ''}
       






        {tabActive === TabActive.pending ? <div>
          <header className="flex pt-8 mx-4">
            <div className="w-2/3">
              <span className="text-gray-500 font-semibold text-sm">Identificador</span>
            </div>
            <div className="w-64">
              <span className="text-gray-500 font-semibold text-sm">Fecha de Carga</span>
            </div>
            <div className="w-48">
              < span className="text-gray-500 font-semibold text-sm">T.T </span>
            </div>
            
          </header>
          {documentsInProces.filter( d => d.status === 'PENDING').map( docPending => ( 
            <div className="flex bg-white mx-4 h-12 items-center mt-4 rounded-lg hover:bg-yellow-200 hover:shadow" key={docPending.job_id}>
              <div className="w-2/3 pl-4">
                <span className="text-gray-700 font-semibold text-sm">{docPending.reference}</span>
              </div>
              <div className="w-64">
                <span className="text-gray-500 font-semibold text-sm">{moment(docPending.upload_date).format(FORMAT_DATETIME)}</span>
              </div>
              <div className="w-48">
                < span className="text-gray-700 font-semibold text-sm">{ moment(moment(new Date().getTime()).diff(moment(docPending.upload_date))).format("mm:ss")}</span>
              </div>
              
          </div>
          ))}
          
        </div> : ''}
      


        {tabActive === TabActive.withError ? <div>
          <header className="flex pt-8 mx-4">
            <div className="w-2/3">
              <span className="text-gray-500 font-semibold text-sm">Identificador</span>
            </div>
            <div className="w-64">
              <span className="text-gray-500 font-semibold text-sm">Fecha de carga</span>
            </div>
            <div className="w-48">
              <span className="text-gray-500 font-semibold text-sm">Demora</span>
            </div>
            <div className="w-64">
              < span className="text-gray-500 font-semibold text-sm">Error</span>
            </div>
            
          </header>
          {documentsInProces.filter( d => d.status === 'FAIL').map( docError => ( 
          <div className="flex bg-white mx-4 mim-h-12 items-center mt-4 rounded-lg hover:bg-red-100 hover:shadow"  key={docError.job_id}>
            <div className="w-2/3 pl-4">
              <span className="text-gray-700 font-semibold text-sm">{docError.reference}</span>
            </div>
            <div className="w-64">
              <span className="text-gray-500 font-semibold text-sm">{moment(docError.upload_date).format(FORMAT_DATETIME)}</span>
            </div>
            <div className="w-48">
              <span className="text-gray-500 font-semibold text-sm">{ moment(moment(docError.processed_at).diff(moment(docError.upload_date))).format("mm:ss")}</span>
            </div>
            <div className="w-64 mr-4">
              <span className="text-gray-700 font-semibold text-sm">{docError.info}</span>
            </div>
            
          </div>))} 
        </div> : ''}
        

       

      </article>
      <Link href="/v/load_file">
        <div className=" flex items-center m-auto shadow absolute bottom-0 right-0 h-12 w-12 bg-indigo-500 mr-24 mb-8 rounded-full"> <IconAdd /> </div>
      </Link>
    </main>

    <aside className="w-16 ">
      <div className="h-8 w-8 mt-4 bg-indigo-100 m-auto flex items-center rounded-lg"><IconPeople /></div>
      <div className="h-8 w-8 mt-4 bg-indigo-100 m-auto flex items-center rounded-lg"><IconNotification /></div>
      <div className="h-8 w-8 mt-4 bg-indigo-100 m-auto flex items-center rounded-lg"><IconDocument /></div>
    </aside>

  </div>

  )
}

const IconDownload = () => (
  <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.4843 13V17C24.4843 17.5304 24.212 18.0391 23.7273 18.4142C23.2427 18.7893 22.5853 19 21.8998 19H3.80859C3.12314 19 2.46577 18.7893 1.98109 18.4142C1.49641 18.0391 1.22412 17.5304 1.22412 17V13" stroke="#667EEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.39331 8L12.8545 13L19.3156 8" stroke="#667EEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.8542 13V1" stroke="#667EEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)

const IconNotification = () => (
  <svg style={{ margin: 'auto' }} width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.8145 5.52857C11.8145 4.42458 11.3703 3.3658 10.5797 2.58516C9.78915 1.80453 8.71689 1.36597 7.59883 1.36597C6.48078 1.36597 5.40852 1.80453 4.61793 2.58516C3.82735 3.3658 3.3832 4.42458 3.3832 5.52857C3.3832 10.3849 1.27539 11.7725 1.27539 11.7725H13.9223C13.9223 11.7725 11.8145 10.3849 11.8145 5.52857Z" stroke="#5E81F4" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.8148 14.5476C8.69128 14.7579 8.51398 14.9324 8.30065 15.0537C8.08733 15.1751 7.84547 15.2389 7.59929 15.2389C7.35312 15.2389 7.11126 15.1751 6.89794 15.0537C6.68461 14.9324 6.50731 14.7579 6.38379 14.5476" stroke="#5E81F4" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)


const IconPeople = () => (
  <svg style={{ margin: 'auto' }} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/person">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M14 7C14 5.897 13.103 5 12 5C10.897 5 10 5.897 10 7C10 8.103 10.897 9 12 9C13.103 9 14 8.103 14 7ZM16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20C19 20.552 18.553 21 18 21C17.447 21 17 20.552 17 20C17 17.243 14.757 15 12 15C9.243 15 7 17.243 7 20C7 20.552 6.553 21 6 21C5.447 21 5 20.552 5 20Z" fill="#231F20" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="14" height="18">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M14 7C14 5.897 13.103 5 12 5C10.897 5 10 5.897 10 7C10 8.103 10.897 9 12 9C13.103 9 14 8.103 14 7ZM16 7C16 9.206 14.206 11 12 11C9.794 11 8 9.206 8 7C8 4.794 9.794 3 12 3C14.206 3 16 4.794 16 7ZM5 20C5 16.14 8.141 13 12 13C15.859 13 19 16.14 19 20C19 20.552 18.553 21 18 21C17.447 21 17 20.552 17 20C17 17.243 14.757 15 12 15C9.243 15 7 17.243 7 20C7 20.552 6.553 21 6 21C5.447 21 5 20.552 5 20Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="24" height="24" fill="#5E81F4" />
        </g>
      </g>
    </g>
  </svg>)

const IconDocument = () => (
  <svg style={{ margin: 'auto' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/file-text">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M8.00011 9.3335H6.00011C5.63211 9.3335 5.33344 9.03483 5.33344 8.66683C5.33344 8.29883 5.63211 8.00016 6.00011 8.00016H8.00011C8.36811 8.00016 8.66677 8.29883 8.66677 8.66683C8.66677 9.03483 8.36811 9.3335 8.00011 9.3335ZM6.00011 10.6668H10.0001C10.3688 10.6668 10.6668 10.9655 10.6668 11.3335C10.6668 11.7015 10.3688 12.0002 10.0001 12.0002H6.00011C5.63211 12.0002 5.33344 11.7015 5.33344 11.3335C5.33344 10.9655 5.63211 10.6668 6.00011 10.6668ZM11.6297 13.3335H4.37033C4.16633 13.3335 4.00033 13.1842 4.00033 13.0002V3.00016C4.00033 2.81616 4.16633 2.66683 4.37033 2.66683H8.00033V4.76683C8.00033 5.81483 8.81166 6.66683 9.80966 6.66683H12.0003V13.0002C12.0003 13.1842 11.8343 13.3335 11.6297 13.3335V13.3335ZM9.33366 3.31883L11.1617 5.3335H9.80966C9.54699 5.3335 9.33366 5.0795 9.33366 4.76683V3.31883ZM13.1603 5.55216L9.53099 1.55216C9.40432 1.41283 9.22566 1.3335 9.03699 1.3335H4.37033C3.43099 1.3335 2.66699 2.0815 2.66699 3.00016V13.0002C2.66699 13.9188 3.43099 14.6668 4.37033 14.6668H11.6297C12.569 14.6668 13.3337 13.9188 13.3337 13.0002V6.00016C13.3337 5.83416 13.2717 5.67483 13.1603 5.55216V5.55216Z" fill="#231F20" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="12" height="14">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M8.00011 9.3335H6.00011C5.63211 9.3335 5.33344 9.03483 5.33344 8.66683C5.33344 8.29883 5.63211 8.00016 6.00011 8.00016H8.00011C8.36811 8.00016 8.66677 8.29883 8.66677 8.66683C8.66677 9.03483 8.36811 9.3335 8.00011 9.3335ZM6.00011 10.6668H10.0001C10.3688 10.6668 10.6668 10.9655 10.6668 11.3335C10.6668 11.7015 10.3688 12.0002 10.0001 12.0002H6.00011C5.63211 12.0002 5.33344 11.7015 5.33344 11.3335C5.33344 10.9655 5.63211 10.6668 6.00011 10.6668ZM11.6297 13.3335H4.37033C4.16633 13.3335 4.00033 13.1842 4.00033 13.0002V3.00016C4.00033 2.81616 4.16633 2.66683 4.37033 2.66683H8.00033V4.76683C8.00033 5.81483 8.81166 6.66683 9.80966 6.66683H12.0003V13.0002C12.0003 13.1842 11.8343 13.3335 11.6297 13.3335V13.3335ZM9.33366 3.31883L11.1617 5.3335H9.80966C9.54699 5.3335 9.33366 5.0795 9.33366 4.76683V3.31883ZM13.1603 5.55216L9.53099 1.55216C9.40432 1.41283 9.22566 1.3335 9.03699 1.3335H4.37033C3.43099 1.3335 2.66699 2.0815 2.66699 3.00016V13.0002C2.66699 13.9188 3.43099 14.6668 4.37033 14.6668H11.6297C12.569 14.6668 13.3337 13.9188 13.3337 13.0002V6.00016C13.3337 5.83416 13.2717 5.67483 13.1603 5.55216V5.55216Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="16" height="16" fill="#5E81F4" />
        </g>
      </g>
    </g>
  </svg>

)

const IconAdd = () => (
  <svg style={{ margin: 'auto' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11V11Z" fill="white" />
  </svg>

)