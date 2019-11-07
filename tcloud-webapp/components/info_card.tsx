import React from 'react';
import '../styles/main.scss'
import {useSelector} from 'react-redux';

interface Properties { 
  key: string
  value: string 
}

interface Props {
  label : string 
  
}


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default (props:Props) => {

  const rawEntities  = useSelector(state =>  state.documentViewer.document.data)

  const values = []

  Object.keys(rawEntities).map( (entityName: string) => {
    values.push({
      key: entityName.replace("_", " ").capitalize(),
      value: rawEntities[entityName].length
    })
  })


  return <div className="bg-white rounded-lg mainContainer py-6 px-4">

    <div className='text-base font-semibold text-gray-800 mb-4'>{props.label}</div>

    {values.map((p:Properties) => (
       <div className= "bg-white row" key={p.key}>
       <p className="bg-white text-sm text-gray-600"> {p.key}</p>
       <p  className="bg-white text-sm text-gray-600 text-right"> {p.value} </p>
     </div>
    ))}
   
 
    <style jsx>
      {
        ` .row {
          display: grid;
          grid-template-columns: 80% 20%;
        }

        .mainContainer {
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
        }
        `
      }
    </style>
  </div>
}