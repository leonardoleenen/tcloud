import React from 'react'
import { useSelector } from 'react-redux'
import uuid4 from 'uuid4'
import * as _ from 'underscore'


const colors = ['green', 'red', 'orange', 'yellow', 'gray', 'teal', 'blue', 'indigo', 'purple', 'pink']



export default () => {

  const entitiesSelected = useSelector(state => state.documentViewer.entity_detail_list) as Array<LNEntity>
  const rawEntities = useSelector(state => state.documentViewer.document.entities) as Array<LNEntity>
  const posSelected = useSelector(state => state.documentViewer.pos_selected)

  const hasEntitySelected = (image: LNImage): LNEntity => {
    let hasSelected: LNEntity = null
    hasSelected = _.first(entitiesSelected.filter((e: LNEntity) => e.pos && e.pos.filter((p: LNPos) => image.line === p.line && image.page === p.page).length >= 1))
      || _.first(entitiesSelected.
        filter((e: LNEntity) => !e.pos && e.values.
          filter((ev: LNEntityValue) => ev.entities.
            filter((en: LNEntity) => en.pos && en.pos.
              filter((p: LNPos) => image.line === p.line && image.page === p.page).length >= 1).length >= 1).length >= 1))
    return hasSelected
  }

  const determineStyle = (page: number, line: number) => {
    let color = ''
    const entity = hasEntitySelected({ page, line } as LNImage)

    if (entity)
      color = colors[_.findIndex(rawEntities, (e: LNEntity) => e.id === entity.id)]

    return color
  }

  const images = useSelector(state => state.documentViewer.document.images) as Array<LNImage>

  return <div className='documentArea mt-4 pb-12'>

    {images.map((i: LNImage,index)  => <div className="relative ">
      <div id={`${i.page}${i.line}`} className={hasEntitySelected(i) ? `flex  absolute h-full w-full` : ''} > 
        {posSelected === (i.page.toString() + i.line.toString()) ? <IconTag/> : <BlankBox/>}
        <div className={hasEntitySelected(i) ? `bg-${determineStyle(i.page, i.line)}-500   w-full opacity-25` : ''}>{true}</div>
      </div>
      <img src={`data:image/png;base64,${i.b64}`} key={uuid4()} className="pl-8" />
      {index!=0 && images[index-1].page != i.page ? 
      <div className="bg-gray-100 w-full  h-16 flex">
          <span className="m-auto "> Página {i.page} de {_.last(images).page}</span> 
      </div> : ''}

    </div>)}

    <style jsx>
      {`
        .documentArea {
          background-color: white;
          overflow-y: auto;
          scroll-behavior: smooth;
          transition-duration: 500ms;
        }

        .marker { 
          cursor: pointer;
          transition: all 400ms ease-in;
        }
      `}
    </style>
  </div>

}

const IconTag = () => (
  <svg className="m-auto mx-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/action/label_24px">
      <path id="icon/action/label_24px_2" fillRule="evenodd" clipRule="evenodd" d="M15.5 5C16.17 5 16.77 5.33 17.13 5.84L21.5 12L17.13 18.16C16.77 18.67 16.17 19 15.5 19L4.5 18.99C3.4 18.99 2.5 18.1 2.5 17V7C2.5 5.9 3.4 5.01 4.5 5.01L15.5 5ZM4.5 17H15.5L19.05 12L15.5 7H4.5V17Z" fill="black"/>
    </g>
  </svg>
)

const BlankBox = () => (
  <div className="m-auto mx-4 w-4 h-4" style={{width:'24px', height: '24px'}}></div>
)