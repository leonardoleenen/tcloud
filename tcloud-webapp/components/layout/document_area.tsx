import React from 'react';
import {useSelector} from 'react-redux'; 



export default () => {
  const fileContent = useSelector( state => state.documentViewer.document.transaction_info.file.content)
  return <div className='documentArea mt-5 mb-5'>
        <img src={fileContent}/>
        <style jsx>
      {`
        .documentArea {
          background-color: white;
        }
        .documentArea img {
          box-shadow: 0px 1px 4px rgba(0,0,0,0.05);
        }
      `}
    </style>
  </div>
}