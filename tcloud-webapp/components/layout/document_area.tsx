import React from 'react';
import {useSelector} from 'react-redux'; 



export default () => {
  const fileContent = useSelector( state => state.documentViewer.document.transaction_info.file.content)
  return <div className='documentArea mt-4'>
        <img src={fileContent}/>
        <style jsx>
      {`
        .documentArea {
          background-color: white;
        }
      `}
    </style>
  </div>
}