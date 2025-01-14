import React from 'react';
import '../static/styles/main.scss'
import { useSelector } from 'react-redux';


interface Props {
  label: string

}


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}





export default (props: Props) => {

  const rawEntities = useSelector(state => state.documentViewer.document.entities) as Array<LNEntity>

  const hasNoDetectedEntities = rawEntities.filter((e: LNEntity) => e.pos && e.pos.length === 0 && !e.values).length > 0

  return <div className="bg-white rounded-lg mainContainer py-6 px-4">

    <div>
      <div className='text-base font-semibold text-gray-800 mb-4'>{props.label}</div>
      {rawEntities.filter((e: LNEntity) => e.pos || e.values).map((e: LNEntity) => (
        <div className="bg-white row" key={e.id}>
          <p className="bg-white text-sm text-gray-600"> {e.display_name}</p>
          <p className="bg-white text-sm text-gray-600 text-right"> {e.values ? e.values.length : 1} </p>
        </div>
      ))}
    </div>


    {hasNoDetectedEntities ? <div>
      <div className='text-base font-semibold text-gray-800 mb-4 mt-4'>Entidades NO detectadas</div>
      {rawEntities.filter((e: LNEntity) => e.pos && e.pos.length === 0 && !e.values).map((e: LNEntity) => (
        <div className="bg-white row" key={e.id}>
          <p className="bg-white text-sm text-red-700"> {e.display_name}</p>

        </div>
      ))}
    </div> : ''}



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