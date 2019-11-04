import React from "react";
import SearchBar from '../../components/layout/search_bar';
import LeftSideBar from '../../components/layout/left_side_bar';
import RightSideBar from '../../components/layout/rigth_side_bar';
import DocumentArea from '../../components/layout/document_area';
import InfoCard from '../../components/info_card';
import ButtonSearch from '../../components/button_search';
import TagsCard from  '../../components/tags_card';
import EntityCardDetail from '../../components/entity_card_detail';

import { useRouter } from 'next/router'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {dataProvider} from '../../service/index';


import {loadDocument} from '../../redux/actions/document_viewer';

import '../../styles/main.scss';

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

   fetchData()

  }, []) 

  //window['e']  = entities

  // console.log(entities[Object.keys(entities)[0]])

  const document = useSelector(state => state.documentViewer.document)
  console.log(document)

  if (!document)
    return <div>Cargando</div>

  return (  
    <div className="container" >
      <SearchBar>
        <ButtonSearch />
      </SearchBar>
      <div className="workspace">
        <LeftSideBar>
          <InfoCard label="Entidades detectadas"/>
          <TagsCard/> 
          <EntityCardDetail/>

        </LeftSideBar>
        <DocumentArea />
        <RightSideBar />
      </div>


      <style jsx>
        {
          `.container {
             display: grid;
             grid-template-rows: 58px 4fr;
          }
          .workspace { 
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
          }
          `
        }
      </style>
    </div>
  )
};
