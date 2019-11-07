import React, {useCallback} from 'react';
import '../../styles/main.scss';
import {useDropzone} from 'react-dropzone'
import {useDispatch} from 'react-redux'
import {loadDocument, cleanDocument} from '../../redux/actions/document_viewer';
import { useRouter } from 'next/router'


export default () => {
  const dispatch = useDispatch()
  const router = useRouter() 
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
   
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents


      const binaryStr = reader.result

      var enc = new TextDecoder("utf-8");
      //const document = String.fromCharCode.apply(null, new Uint8Array(binaryStr as ArrayBuffer));
      const rawDocument = JSON.parse(enc.decode(binaryStr as ArrayBuffer))

      const document = Object.keys(rawDocument).map( key => rawDocument[key])[0]
      
      dispatch(cleanDocument())
      dispatch(loadDocument(document))
      router.push('/v')
      //console.log(document)
    }

    acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})


  return (<div className="h-screen v-screen bg-indigo-100 flex flex-col" {...getRootProps()}> 
  <input {...getInputProps()} />
  
    <div className="m-auto">
      
      <div className="m-auto bg-white w-64 h-48 rounded-lg "  > 
        <IconDownload/> 
        <p className="flex justify-center content-center  m-auto">Arrastre un archivo aqui</p>
        <div className="flex ">
          <div className=" m-auto flex flex-col bg-red-500 text-white mt-4 px-4 rounded-lg"> .tiff</div> 
          <div className=" m-auto flex flex-col bg-red-500 text-white mt-4 px-4 rounded-lg"> .jpg</div>
        </div>
      </div>
      <p className="flex justify-center content-center m-auto mt-4 text-lg"> O  <span className="underline"> Seleccione un archivo</span> </p>
      
      

    </div>
    
  </div>)
}

const IconDownload = () => (
  <svg className="pt-4" style={{margin: "auto"}} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M36.6762 40.253C36.6699 40.1695 36.6667 40.0851 36.6667 40V13.3333C36.6667 11.4933 38.1567 10 40 10C41.8434 10 43.3334 11.4933 43.3334 13.3333V39.9993L51.3333 34C52.8066 32.89 54.8966 33.1933 56 34.6666C57.1066 36.14 56.8066 38.23 55.3333 39.3333L42 49.3333C41.41 49.7766 40.7033 50 40 50C39.33 50 38.66 49.7966 38.0833 49.3933L24.75 40.0133C23.2433 38.9533 22.88 36.8733 23.94 35.37C25 33.8633 27.0766 33.5 28.5833 34.56L36.6762 40.253ZM20 56.6667V60H60V56.6667C60 54.8333 61.5 53.3333 63.3334 53.3333C65.1667 53.3333 66.6667 54.8333 66.6667 56.6667V63.3333C66.6667 65.1667 65.1667 66.6667 63.3334 66.6667H16.6667C14.8334 66.6667 13.3334 65.1667 13.3334 63.3333V56.6667C13.3334 54.8333 14.8334 53.3333 16.6667 53.3333C18.5 53.3333 20 54.8333 20 56.6667Z" fill="#718096"/>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="54" height="57">
    <path fillRule="evenodd" clipRule="evenodd" d="M36.6762 40.253C36.6699 40.1695 36.6667 40.0851 36.6667 40V13.3333C36.6667 11.4933 38.1567 10 40 10C41.8434 10 43.3334 11.4933 43.3334 13.3333V39.9993L51.3333 34C52.8066 32.89 54.8966 33.1933 56 34.6666C57.1066 36.14 56.8066 38.23 55.3333 39.3333L42 49.3333C41.41 49.7766 40.7033 50 40 50C39.33 50 38.66 49.7966 38.0833 49.3933L24.75 40.0133C23.2433 38.9533 22.88 36.8733 23.94 35.37C25 33.8633 27.0766 33.5 28.5833 34.56L36.6762 40.253ZM20 56.6667V60H60V56.6667C60 54.8333 61.5 53.3333 63.3334 53.3333C65.1667 53.3333 66.6667 54.8333 66.6667 56.6667V63.3333C66.6667 65.1667 65.1667 66.6667 63.3334 66.6667H16.6667C14.8334 66.6667 13.3334 65.1667 13.3334 63.3333V56.6667C13.3334 54.8333 14.8334 53.3333 16.6667 53.3333C18.5 53.3333 20 54.8333 20 56.6667Z" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
    <rect width="80" height="80" fill="#718096"/>
    </g>
  </svg>
)

