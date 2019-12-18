import React, { useEffect, useState } from 'react'
import '../../static/styles/main.scss'
import moment from 'moment'
import Link from 'next/link'
import {extractTextFromEntity} from '../../service/index'
import lunr from 'lunr'
import Loading from '../../components/loading'

enum TabActive {
  processed="PROCESSED",
  pending = "PENDING",
  withError = "WITHERROR"
}

interface Document {
  document_id? : string 
  job_id? : string 
  reference:  string 
  status: string
  processed_at: number
  upload_date : number
  info: string
}

const FORMAT_DATETIME= "DD-MM-YYYY hh:mm:ss A"

let idxProcessed = null
let idxInProgress = null


export default () => {

  const [documents,setDocuments] =useState(null)
  const [tabActive, setTabActive] = useState<TabActive>(TabActive.processed)
  const [documentsInProcess, setDocumentsInProcess] = useState(null)
  const [lastUpdate, setLastUpdate] = useState<number>(null)
  const [textToSearch, setTextToSearch] = useState(null)

  const tabSelectedStyle = 'px-12 py-3 text-sm font-semibold text-indigo-500 uppercase border-b-2 border-indigo-500 text-center'
  const tabNotSelectedStyle='px-12 py-3 text-sm font-semibold text-gray-600 uppercase border-b-2 border-gray-300 text-center hover:opacity-75'
  
  useEffect(() => {
      var myWorker = new Worker("/worker.js");

      myWorker.onmessage = function (oEvent) {
        setLastUpdate(oEvent.data.runAt)
        switch(oEvent.data.type) {
          case 'DOCUMENT_PROCESSED_LIST':
              const temporalResult = oEvent.data.value.docs
              temporalResult.map( (d, index) => {     
                temporalResult[index].rawText = d.entities.map( (e:LNEntity) => extractTextFromEntity(e)).join(' ')
              })
              idxProcessed = lunr( function(){
                this.ref('document_id')
                this.field('rawText')
                this.field('reference')
                temporalResult.forEach( e => {
                  this.add(e)
                })
              });            
              setDocuments(temporalResult)
              break
          case 'DOCUMENT_IN PROGRESS_LIST':
              idxInProgress = lunr( function(){
                this.ref('job_id')
                this.field('reference')
                oEvent.data.value.docs.forEach( e => {
                  this.add(e)
                })
              });       
              setDocumentsInProcess(oEvent.data.value.docs)
              break
          default: 
            return 
        }
      };

      myWorker.postMessage({
        type: 'INIT'
      });
  }, [])

  

  const filterDocuments = () : Array<Document>=> {
    let repository : Array<Document> = [] 
    switch(tabActive) {
      case TabActive.processed:
        repository = documents && textToSearch ? documents.map( doc => idxProcessed.search(`${textToSearch}*`).filter( f => f.ref === doc.document_id)[0] ? doc : null).filter( element => element != null) : documents 
        break
      case TabActive.withError:
        repository =   documentsInProcess && textToSearch ?  documentsInProcess.map( doc => idxInProgress.search(`${textToSearch}*`).filter( f => f.ref === doc.job_id)[0] ? doc : null).filter( element => element != null) : documentsInProcess
        break
      case TabActive.pending:
          repository = documentsInProcess && textToSearch  ?  documentsInProcess.map( doc => idxInProgress.search(`${textToSearch}*`).filter( f => f.ref === doc.job_id)[0] ? doc : null).filter( element => element != null) : documentsInProcess
          break
      default: 
        repository = []
    }

    if (textToSearch)  {
      if (tabActive === TabActive.processed)
        return  repository.map( doc => idxProcessed.search(`${textToSearch}*`).filter( f => f.ref === doc.document_id)[0] ? doc : null).filter( element => element != null)
      else
        return  repository.map( doc => idxInProgress.search(`${textToSearch}*`).filter( f => f.ref === doc.job_id)[0] ? doc : null).filter( element => element != null)
    }

    return repository

    
  }

  if (!documents) return <div><Loading/></div>

  return (<div className="flex">
    <main className="w-full clearfix ">

      <header className="h-16 flex items-center bg-white sticky top-0 border-b-2 border-gray-200">
        <div className="bg-gray-300 flex items-center focus:shadow-outline border border-gray-300 rounded-lg   mx-4 py-2 px-4 block w-1/3">
        <div><IconSearch/></div>
        <input 
          value={textToSearch ? textToSearch : ''}
          onChange={ (e) => {
            setTextToSearch(e.target.value)
          }}
          max="320" 
          className="focus:outline-none bg-gray-300 mx-4 w-full  appearance-none leading-normal" 
          placeholder="¿Qué documento desea buscar?" />
        </div>
      </header>

      <article className="min-h-screen bg-gray-200 shadow px-6 py-8">
        <div className="flex justify-between">
          <h2 className= "text-2xl font-bold text-gray-800">Documentos</h2>
          <label className="text-right">
            <p className='text-gray-600 text-sm'>Última actualización</p>
            <p className='text-gray-800 text-sm font-semibold'>{moment(lastUpdate).format('h:mm:ssA')}</p>
          </label>
        </div>
        <div className="flex items-center m-auto pt-4 relative">
          <button className={`focus:outline-none  ${tabActive === TabActive.processed ? tabSelectedStyle : tabNotSelectedStyle}`} onClick={ () => setTabActive(TabActive.processed)}>Procesados</button>
          <button className={`focus:outline-none  ${tabActive === TabActive.pending ? tabSelectedStyle : tabNotSelectedStyle}`}  onClick={ () => setTabActive(TabActive.pending)}>En Proceso</button>
          <button className={`focus:outline-none  ${tabActive === TabActive.withError ? tabSelectedStyle : tabNotSelectedStyle}`}   onClick={ () => setTabActive(TabActive.withError)}>Con Errores</button>
        </div>


        


       {tabActive === TabActive.processed ? <div>
        <header className="flex pt-8">
          <div className="w-2/3">
            <span className="text-gray-500 font-semibold text-sm">Identificador</span>
          </div>
          <div className="w-64">
            < span className="text-gray-500 font-semibold text-sm">Fecha de subida</span>
          </div>
          <div className="w-32">
            < span className="text-gray-500 font-semibold text-sm">T. P</span>
          </div>
          <div className="w-32">
            <span className="text-gray-500 font-semibold text-sm">Descarga</span>
          </div>
        </header>

        { filterDocuments()
              .map( d => (
          <div className="flex bg-white h-16 items-center mt-4 rounded-lg hover:bg-green-100 hover:shadow" key={d.document_id}>
            <div className="w-2/3 pl-4">
              <Link href={`/v?documentId=${d.document_id}`}>
                <span className="text-gray-700 font-semibold text-sm cursor-pointer">{d.reference}</span>
              </Link>
            </div>
            <div className="w-64">
              <span className="text-gray-600 text-sm">{moment(d.processed_at).format(FORMAT_DATETIME)}</span>
            </div>
            <div className="w-32">
              <span className="text-gray-600 text-sm">{ moment(moment(d.processed_at).diff(moment(d.upload_date))).format("mm:ss")}</span>
            </div>
            <div className="w-32">
              <span className="text-gray-800 text-sm cursor-pointer hover:opacity-75"><IconDownload /></span>
            </div>
          </div>
        ))}
        </div> : ''}
       






        {tabActive === TabActive.pending ? <div>
          <header className="flex pt-8">
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
          {filterDocuments().filter( d => d.status === 'PENDING').map( docPending => ( 
            <div className="flex bg-white h-16 items-center mt-4 rounded-lg hover:bg-yellow-200 hover:shadow" key={docPending.job_id}>
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
          <header className="flex pt-8">
            <div className="w-7/12">
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
          {filterDocuments().filter( d => d.status === 'FAIL').map( docError => ( 
          <div className="flex bg-white h-16 items-center mt-4 rounded-lg hover:bg-red-100 hover:shadow"  key={docError.job_id}>
            <div className="w-7/12 pl-4">
              <span className="text-gray-700 font-semibold text-sm">{docError.reference}</span>
            </div>
            <div className="w-64">
              <span className="text-gray-600 text-sm">{moment(docError.upload_date).format(FORMAT_DATETIME)}</span>
            </div>
            <div className="w-48">
              <span className="text-gray-600 text-sm">{ moment(moment(docError.processed_at).diff(moment(docError.upload_date))).format("mm:ss")}</span>
            </div>
            <div className="w-64">
              <span className="text-gray-600 text-sm">{docError.info}</span>
            </div>
            
          </div>))} 
        </div> : ''}
        

       

      </article>
      <Link href="/v/load_file">
        <div className="cursor-pointer flex items-center m-auto shadow fixed bottom-0 right-0 h-12 w-12 bg-indigo-500 mr-24 mb-8 rounded-full hover:opacity-75"> <IconAdd /> </div>
      </Link>
    </main>

    <aside className="w-16 bg-white border-l-2 border-gray-200">
    <div className="sticky top-0 pt-4">
      <div className="h-8 w-8 bg-indigo-100 m-auto flex items-center justify-center rounded-lg cursor-pointer"><IconPeople /></div>
      <div className="h-8 w-8 mt-4 bg-indigo-100 m-auto flex items-center rounded-lg cursor-pointer"><IconNotification /></div>
    </div>
    </aside>

  </div>

  )
}

const IconDownload = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.2241 13V17C19.2241 17.5304 19.0134 18.0391 18.6383 18.4142C18.2633 18.7893 17.7546 19 17.2241 19H3.22412C2.69369 19 2.18498 18.7893 1.80991 18.4142C1.43483 18.0391 1.22412 17.5304 1.22412 17V13" stroke="#667EEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.22437 8L10.2244 13L15.2244 8" stroke="#667EEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.2241 13V1" stroke="#667EEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const IconNotification = () => (
  <svg style={{ margin: 'auto' }} width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.8145 5.52857C11.8145 4.42458 11.3703 3.3658 10.5797 2.58516C9.78915 1.80453 8.71689 1.36597 7.59883 1.36597C6.48078 1.36597 5.40852 1.80453 4.61793 2.58516C3.82735 3.3658 3.3832 4.42458 3.3832 5.52857C3.3832 10.3849 1.27539 11.7725 1.27539 11.7725H13.9223C13.9223 11.7725 11.8145 10.3849 11.8145 5.52857Z" stroke="#5E81F4" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.8148 14.5476C8.69128 14.7579 8.51398 14.9324 8.30065 15.0537C8.08733 15.1751 7.84547 15.2389 7.59929 15.2389C7.35312 15.2389 7.11126 15.1751 6.89794 15.0537C6.68461 14.9324 6.50731 14.7579 6.38379 14.5476" stroke="#5E81F4" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)


const IconPeople = () => (
  <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 20C14 15.0294 11.0899 11 7.5 11C3.91015 11 1 15.0294 1 20" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 8C9.433 8 11 6.433 11 4.5C11 2.567 9.433 1 7.5 1C5.567 1 4 2.567 4 4.5C4 6.433 5.567 8 7.5 8Z" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)


const IconAdd = () => (
  <svg style={{ margin: 'auto' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11V11Z" fill="white" />
  </svg>

)

const IconSearch =  () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 8.25C3.75 5.76825 5.76825 3.75 8.25 3.75C10.7317 3.75 12.75 5.76825 12.75 8.25C12.75 10.7317 10.7317 12.75 8.25 12.75C5.76825 12.75 3.75 10.7317 3.75 8.25ZM15.5302 14.4697L12.984 11.9228C13.7737 10.9073 14.25 9.6345 14.25 8.25C14.25 4.94175 11.5582 2.25 8.25 2.25C4.94175 2.25 2.25 4.94175 2.25 8.25C2.25 11.5582 4.94175 14.25 8.25 14.25C9.6345 14.25 10.9072 13.7738 11.9227 12.984L14.4697 15.5303C14.616 15.6765 14.808 15.75 15 15.75C15.192 15.75 15.384 15.6765 15.5302 15.5303C15.8235 15.237 15.8235 14.763 15.5302 14.4697Z" fill="#718096"/>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="14" height="14">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 8.25C3.75 5.76825 5.76825 3.75 8.25 3.75C10.7317 3.75 12.75 5.76825 12.75 8.25C12.75 10.7317 10.7317 12.75 8.25 12.75C5.76825 12.75 3.75 10.7317 3.75 8.25ZM15.5302 14.4697L12.984 11.9228C13.7737 10.9073 14.25 9.6345 14.25 8.25C14.25 4.94175 11.5582 2.25 8.25 2.25C4.94175 2.25 2.25 4.94175 2.25 8.25C2.25 11.5582 4.94175 14.25 8.25 14.25C9.6345 14.25 10.9072 13.7738 11.9227 12.984L14.4697 15.5303C14.616 15.6765 14.808 15.75 15 15.75C15.192 15.75 15.384 15.6765 15.5302 15.5303C15.8235 15.237 15.8235 14.763 15.5302 14.4697Z" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
    <rect width="18" height="18" fill="#718096"/>
    </g>
  </svg>

)