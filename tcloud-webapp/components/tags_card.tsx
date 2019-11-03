import React from 'react';



export default () => {

  return <div className="mainContainer p-2 m-2 bg-white rounded-lg"> 
    <label className="subtitle mb-4">Marcadores</label>
    <article> 
      Van etiquetas
    </article>

    <style jsx>
      {
        `.mainContainer {
          display: grid;
          grid-template-rows: 1fr 3fr; 
        }
        `
      }
    </style>
  </div>
}