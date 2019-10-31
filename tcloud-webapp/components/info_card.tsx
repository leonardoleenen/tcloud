import React from 'react';
import '../styles/main.scss'

interface Properties { 
  key: string
  value: string 
}

interface Props {
  label : string 
  values : Array<Properties>
}


export default (props:Props) => {

  return <div className="m-2 bg-white rounded-lg">

    <div className='py-4  ml-2 subtitle bg-white rounded '>{props.label}</div>

    {props.values.map((p:Properties) => (
       <div className= "bg-white ml-2 row">
       <p className="bg-white text-gray-600"> {p.key}</p>
       <p  className="bg-white text-gray-600"> {p.value} </p>
     </div>
    ))}
   
   
    <p className="bg-white rounded py-2"> </p>
 
    <style jsx>
      {
        ` .row {
          display: grid;
          grid-template-columns: 80% 20%;
        }
        `
      }
    </style>
  </div>
}