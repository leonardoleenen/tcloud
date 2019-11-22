import React from "react"
import uuid4 from 'uuid4' 
import LeftSideBar from '../../components/layout/left_side_bar';
import RightSideBar from '../../components/layout/rigth_side_bar';
import DocumentArea from '../../components/layout/document_area';
import InfoCard from '../../components/info_card';

import TagsCard from  '../../components/tags_card';
import EntityCardDetail from '../../components/entity_card_detail';

import { useRouter } from 'next/router'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import dataProvider from '../../service/index';


import {loadDocument} from '../../redux/actions/document_viewer';

import '../../static/styles/main.scss';

export default () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const {documentId} = router.query

  useEffect( () => {
   const fetchData = async () =>  {
    const d = await dataProvider.getDocument(documentId as string)

    dispatch(loadDocument(d.data[Object.keys(d.data)[0]]))
    
    // setEntities(d.data)
   }

   if (documentId)
    fetchData()

  }, []) 

 
  
  const document = useSelector(state => state.documentViewer.document)
  const entityDetailList = useSelector( state => state.documentViewer.entity_detail_list)


  if (!document)
    return <div>Cargando</div>

  return (  
    <div className="bg-gray-100" >
      
      <div className="workspace">
        <LeftSideBar>
          <InfoCard label="Entidades detectadas"/>
          <TagsCard/> 

          {entityDetailList.map( (e:LNEntity) =>  <EntityCardDetail entity={e} key={uuid4()}/>)}

        </LeftSideBar>
        <DocumentArea />
        <RightSideBar />
      </div>


      <style jsx>
        {
          `.container {
             display: grid;
          }
          .workspace { 
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
          }
          `
        }
      </style>
    </div>
  )
};
