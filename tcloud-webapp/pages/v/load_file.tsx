import React, { useCallback, useState } from 'react';
import '../../styles/main.scss';
import uuid4 from 'uuid4'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import Waiting from '../../components/waiting_load_result'

import { useDispatch } from 'react-redux'
import { loadDocument } from '../../redux/actions/document_viewer';
import { useRouter } from 'next/router'


const getRequest = (b64) => {
  return {
    job_name: uuid4(),
    input_spec: {
      plugin_name: "input_adapters.receive_request_pdf",
      worker: "CV",
      meta: {
        b64
      }
    },
    pipeline: [
      {
        plugin_name: "extract_pdf_images",
        worker: "CV"
      },
      {
        plugin_name: "document_factory.create_document",
        worker: "CV"
      },
      {
        worker: "OCR",
        plugin_name: "read_document.document_ocr"
      },
      {
        plugin_name: "razon_social.plugin",
        worker: "NLP",
        input_adapter: {
          worker: "NLP",
          plugin_name: "razon_social.input"
        }
      },
      {
        plugin_name: "socios.plugin",
        worker: "NLP",
        input_adapter: {
          worker: "NLP",
          plugin_name: "socios.input"
        }
      },
      {
        plugin_name: "tipicidad.plugin",
        worker: "NLP",
        input_adapter: {
          worker: "NLP",
          plugin_name: "tipicidad.input"
        },
        output_adapter: {
          plugin_name: "tipicidad.output",
          worker: "NLP"
        }
      }
    ],
    output_spec: {
      plugin_name: "output_adapters.output_json",
      worker: "NLP"
    }

  } as LNSRequestSpec
}

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [pending, setPending] = useState(false)
  //const [jobId, setJobId] = useState()

  const getStatus = (job_id: string) => {
    axios.get('http://docker01.leafnoise.io:35000/jobs/status?id=' + job_id).then(result => {

      if (result.data.status != 'FINISHED') {
        setTimeout(() => getStatus(job_id), 5000)
        return
      }

      setPending(false)
      axios.get('http://docker01.leafnoise.io:35000/jobs/output?id=' + job_id).then(result => {
        dispatch(loadDocument(result.data))
        router.push('/v')
      })
    })
  }

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = (fileLoadedEvent) => {
      const arrayBuffer = fileLoadedEvent.target.result;

      var base64 = btoa(
        new Uint8Array(arrayBuffer as ArrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );


      const requestToSend = getRequest(base64)

      setPending(true)
      axios.post('http://docker01.leafnoise.io:35000/jobs/submit', requestToSend).then(result => {
        //setJobId(result.data.job_id)
        setTimeout(() => getStatus(result.data.job_id), 5000)
      })

    }

    acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })


  if (pending) return (<Waiting/>)

  return (<div className="h-screen v-screen bg-gray-100 flex" {...getRootProps()}>
    <input {...getInputProps()} />

    <div className="m-auto cursor-pointer flex-grow max-w-2xl">

      <div className="m-auto bg-white shadow-xl p-6">
        <div className="p-12 border-dashed border-2 border-gray-400">
          <IconDownload />
          <p className="m-auto text-center text-2xl text-gray-600">Arrastre un archivo aqui</p>
          <div className="flex justify-center">
            <div className="bg-red-500 ml-1 mx-1 text-white mt-4 px-6 py-1 rounded-lg text-center"> .tiff</div>
            <div className="bg-red-500 ml-1 mx-1 text-white mt-4 px-6 py-1 rounded-lg text-center"> .jpg</div>
          </div>
        </div>
      </div>
      <p className="m-auto mt-6 text-center text-gray-600 text-lg"> O <span className="underline">Seleccione un archivo</span> </p>



    </div>

  </div>)
}

const IconDownload = () => (
  <svg style={{ margin: "auto" }} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M36.6762 40.253C36.6699 40.1695 36.6667 40.0851 36.6667 40V13.3333C36.6667 11.4933 38.1567 10 40 10C41.8434 10 43.3334 11.4933 43.3334 13.3333V39.9993L51.3333 34C52.8066 32.89 54.8966 33.1933 56 34.6666C57.1066 36.14 56.8066 38.23 55.3333 39.3333L42 49.3333C41.41 49.7766 40.7033 50 40 50C39.33 50 38.66 49.7966 38.0833 49.3933L24.75 40.0133C23.2433 38.9533 22.88 36.8733 23.94 35.37C25 33.8633 27.0766 33.5 28.5833 34.56L36.6762 40.253ZM20 56.6667V60H60V56.6667C60 54.8333 61.5 53.3333 63.3334 53.3333C65.1667 53.3333 66.6667 54.8333 66.6667 56.6667V63.3333C66.6667 65.1667 65.1667 66.6667 63.3334 66.6667H16.6667C14.8334 66.6667 13.3334 65.1667 13.3334 63.3333V56.6667C13.3334 54.8333 14.8334 53.3333 16.6667 53.3333C18.5 53.3333 20 54.8333 20 56.6667Z" fill="#718096" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="54" height="57">
      <path fillRule="evenodd" clipRule="evenodd" d="M36.6762 40.253C36.6699 40.1695 36.6667 40.0851 36.6667 40V13.3333C36.6667 11.4933 38.1567 10 40 10C41.8434 10 43.3334 11.4933 43.3334 13.3333V39.9993L51.3333 34C52.8066 32.89 54.8966 33.1933 56 34.6666C57.1066 36.14 56.8066 38.23 55.3333 39.3333L42 49.3333C41.41 49.7766 40.7033 50 40 50C39.33 50 38.66 49.7966 38.0833 49.3933L24.75 40.0133C23.2433 38.9533 22.88 36.8733 23.94 35.37C25 33.8633 27.0766 33.5 28.5833 34.56L36.6762 40.253ZM20 56.6667V60H60V56.6667C60 54.8333 61.5 53.3333 63.3334 53.3333C65.1667 53.3333 66.6667 54.8333 66.6667 56.6667V63.3333C66.6667 65.1667 65.1667 66.6667 63.3334 66.6667H16.6667C14.8334 66.6667 13.3334 65.1667 13.3334 63.3333V56.6667C13.3334 54.8333 14.8334 53.3333 16.6667 53.3333C18.5 53.3333 20 54.8333 20 56.6667Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <rect width="80" height="80" fill="#718096" />
    </g>
  </svg>
)

