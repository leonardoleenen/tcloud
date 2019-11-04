import React from 'react';
import ToggleButton from '../components/toggle_button'
import {useSelector} from 'react-redux';


export default () => {

  const rawEntities = useSelector( state => state.documentViewer.document.data)
  
  const values = []

  Object.keys(rawEntities).map( (entityName: string) => {
    values.push({
      key: entityName.replace("_", " ").capitalize()
    })
  })


  return <div className="mainContainer p-2 m-2 bg-white rounded-lg"> 
    <label className="subtitle mb-4">Marcadores</label>
    <article> 
      {values.map( (e:any) => <ToggleButton value={e.key} color="indigo" key={e.key}/>) }
    </article>

    <style jsx>
      {
        `.mainContainer {
          display: grid;
          grid-template-rows: 1fr 3fr; 
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr 
        }
        `
      }
    </style>
  </div>
}