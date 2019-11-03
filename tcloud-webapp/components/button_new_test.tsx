import React from 'react';


export default () => {

  return  <div className="p-2 m-2 p-2 m-2 rounded-lg button hover:border-indigo-700 border border-indigo-500" >
    <Icon></Icon>
    <p className="text-indigo-500 hover:text-indigo-700"> Nueva prueba</p>
    <style jsx>
      {
        ` .button {
            display:grid;
            grid-template-columns: 1fr 3fr;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);   
            width:190px;
        }
        p {
          font-style: normal;
          font-weight: 600;
        }
        .icon {
          margin: auto;
        }
        
        `
      }
    </style>
    </div>
 
}

const Icon = () => {
  return (<svg  style={{margin:'auto'}} width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.25 1H2.25C1.91848 1 1.60054 1.1317 1.36612 1.36612C1.1317 1.60054 1 1.91848 1 2.25V12.25C1 12.5815 1.1317 12.8995 1.36612 13.1339C1.60054 13.3683 1.91848 13.5 2.25 13.5H9.75C10.0815 13.5 10.3995 13.3683 10.6339 13.1339C10.8683 12.8995 11 12.5815 11 12.25V4.75L7.25 1Z" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="sM7.25 1V4.75H11" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 11V7.25" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.125 9.125H7.875" stroke="#667EEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}