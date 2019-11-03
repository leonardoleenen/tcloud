import React, { useState } from 'react'

export default () => {

  const [isExpanded, collapase] = useState(false)

  return <div className="mainContainer p-2 m-2 bg-white rounded-lg">
    <header>
      <label className="subtitle mb-4">Socios</label>
      <div onClick={() => collapase(!isExpanded)} className='expandIcon bg-gray-200 rounded-lg'>{isExpanded ? <CollapseIcon /> : <ExpandIcon />}</div>
    </header>
    {isExpanded ? <div><ul>
      <li className='text-sm text-gray-600 border-b py-2'>DANIEL MENDOZA CANO, paraguayo, mayor de edad, nacido el 03 de Ene</li>
    </ul>
      <ul>
        <li className='text-sm text-gray-600  border-b py-2'>DANIEL MENDOZA CANO, paraguayo, mayor de edad, nacido el 03 de Ene</li>
      </ul>
      <ul>
        <li className='text-sm text-gray-600  border-b py-2'>DANIEL MENDOZA CANO, paraguayo, mayor de edad, nacido el 03 de Ene</li>
      </ul> </div> : ''}

    <style jsx>
      {
        `.mainContainer {
          display: grid;
          grid-template-rows: 30px 1fr; 
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }

        ul.li {
          list-style-position: inside;
        }

        header {
          display:grid; 
          grid-template-columns: 1fr 20px;
          
        }

        .expandIcon {
          width: 20px;
          height: 20px;
          margin: auto;
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

const CollapseIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 5.1875L5.3125 1.125L9.375 5.1875" stroke="#667EEA" strokeWidth="1.25" />
  </svg>
)

const ExpandIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.75 0.8125L4.6875 4.875L0.625 0.8125" stroke="#667EEA" strokeWidth="1.25" />
  </svg>

)