import React from 'react';
import ToggleButton from '../components/toggle_button'
import {useSelector, useDispatch} from 'react-redux';
import {updateEntityDetailList} from '../redux/actions/document_viewer'; 

const colors = ['gray' , 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']



export default () => {

  const rawEntities = useSelector( state => state.documentViewer.document.entities) as Array<LNEntity>
  const dispatch = useDispatch()

   const selectItem = (id: string) => {
    dispatch(updateEntityDetailList(id))
  }

 

  return <div className="bg-white rounded-lg mainContainer py-6 px-4 mt-5"> 
    <div className="text-base font-semibold text-gray-800 mb-4">Marcadores</div>
    <article> 
      {rawEntities.map( (e:LNEntity, index: number) => <ToggleButton callBackFunc={selectItem} value={e.display_name} color={colors[index]} id={e.id} key={e.id} />) }
    </article>

    <style jsx>
      {
        `.mainContainer {
          // display: grid;
          // grid-template-rows: 1fr 3fr;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }
        article {
          // display: grid;
          // grid-gap: 10px;
          // grid-template-columns: 1fr 1fr
        }
        `
      }
    </style>
  </div>
}