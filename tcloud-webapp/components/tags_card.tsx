import React from 'react';
import ToggleButton from '../components/toggle_button'


export default () => {

  return <div className="mainContainer p-2 m-2 bg-white rounded-lg"> 
    <label className="subtitle mb-4">Marcadores</label>
    <article> 
      <ToggleButton value="Socios" color="indigo"/>
    </article>

    <style jsx>
      {
        `.mainContainer {
          display: grid;
          grid-template-rows: 1fr 3fr; 
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }
        `
      }
    </style>
  </div>
}