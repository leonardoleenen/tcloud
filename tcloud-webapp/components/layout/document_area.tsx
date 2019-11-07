import React from 'react';
import { useSelector } from 'react-redux';

const style = (pos) => {
  return { display: "grid", gridTemplateColumns: "8% 82%", position: "absolute", top: pos.area['y-pos'] + "px", width: "60%", height: pos.area.height + "px" }
}

const colors = ['green', 'red', 'orange', 'yellow', 'gray', 'teal', 'blue', 'indigo', 'purple', 'pink']




export default () => {

  const entityDetailList = useSelector(state => state.documentViewer.entity_detail_list)
  const entityList = useSelector(state => state.documentViewer.document.data)


  const fileContent = useSelector(state => state.documentViewer.document.transaction_info.file.content)
  return <div className='documentArea mt-4'>
    {entityDetailList.map(e => (
      (
        e.value.map(pos => {
           return pos.area ? ((<div style={style(pos) as React.CSSProperties} >
            <div style={{ height: pos.area.height + "px" }} className="bg-white w-18 h-18 text-black" ><span className={`flex justify-center rounded-full bg-${colors[Object.keys(entityList).indexOf(e.key)]}-700   mx-2 text-white`}>{e.key.trim().split("_").map(a => a[0].toUpperCase()).join("")}</span></div>
            <div className={`mark bg-${colors[Object.keys(entityList).indexOf(e.key)]}-700 opacity-25 h-full`}> .</div>
          </div>
          )) : ''
        })
      )
    )
    )}


    <img src={fileContent} />
    <style jsx>
      {`
        .documentArea {
          background-color: white;
        }
      `}
    </style>
  </div>
}