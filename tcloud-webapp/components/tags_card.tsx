import React from 'react';
import ToggleButton from '../components/toggle_button'
import {useSelector, useDispatch} from 'react-redux';
import {updateEntityDetailList} from '../redux/actions/document_viewer'; 

const colors = ['gray' , 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']



export default () => {

  const rawEntities = useSelector( state => state.documentViewer.document.data)
  const dispatch = useDispatch()

  const values = []

  const selectItem = (id: string) => {
    dispatch(updateEntityDetailList(id))
  }

  Object.keys(rawEntities).map( (entityName: string) => {
    values.push({
      key: entityName,
      description: entityName.replace("_", " ").capitalize()
    })
  })


  return <div className="mainContainer mt-4 p-4 bg-white rounded-lg"> 
    <label className="subtitle mb-4">Marcadores</label>
    <article> 
      {values.map( (e:any, index: number) => <ToggleButton callBackFunc={selectItem} value={e.description} color={colors[index]} id={e.key} key={e.key} />) }
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
          grid-gap: 10px;
         
          // grid-template-columns: 1fr 1fr 
        }
        `
      }
    </style>
  </div>
}