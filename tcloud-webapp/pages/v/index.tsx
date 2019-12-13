import React from "react"
import uuid4 from 'uuid4'
import LeftSideBar from '../../components/layout/left_side_bar';
import RightSideBar from '../../components/layout/rigth_side_bar';
import SkinnyRigthSideBar  from '../../components/layout/skinny_right_side_bar'
import DocumentArea from '../../components/layout/document_area';
import InfoCard from '../../components/info_card';

import TagsCard from '../../components/tags_card';
import EntityCardDetail from '../../components/entity_card_detail';

import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { dataProvider } from '../../service/index';


import { loadDocument, showLeftPanel, hideLeftPanel } from '../../redux/actions/document_viewer';

import '../../static/styles/main.scss';

export default () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { documentId } = router.query
  const leftPanelIsOpen = useSelector(state => state.settings.leftPanelIsOpen)
  const rightPanelIsOpen = useSelector(state => state.settings.rightPanelIsOpen)
  useEffect(() => {
    const fetchData = async () => {
      const d = await dataProvider.getDocument(documentId as string)
      dispatch(loadDocument(d.data))
    }

    if (documentId)
      fetchData()

  }, [])



  const document = useSelector(state => state.documentViewer.document)
  const entityDetailList = useSelector(state => state.documentViewer.entity_detail_list)


  if (!document)
    return <div>Cargando</div>

  return (
    <div className="bg-gray-100" >

      <div className="workspace">
        <LeftSideBar>
          {leftPanelIsOpen ? <div className="flex items-center mb-4 cursor-pointer IconHide" onClick={() => dispatch(hideLeftPanel())}>
            <IconLeftArrow />
            <IconLeftArrow />
            <label className="mx-4 text-gray-600 cursor-pointer">Ocultar </label>
          </div> : <div className="cursor-pointer mb-4 IconMenu fixed" onClick={() => dispatch(showLeftPanel())}><IconMenu /></div>}


          {leftPanelIsOpen ? <div className="leftPanel IsOpen">
            <InfoCard label="Entidades detectadas" />
            <TagsCard />
            {entityDetailList.map((e: LNEntity) => <EntityCardDetail entity={e} key={uuid4()} />)}</div> : 
            <div className="leftPanel">
              <InfoCard label="Entidades detectadas" />
              <TagsCard />
            {entityDetailList.map((e: LNEntity) => <EntityCardDetail entity={e} key={uuid4()} />)}</div>}


        </LeftSideBar>
        <DocumentArea />
        {rightPanelIsOpen ? <RightSideBar /> : <SkinnyRigthSideBar/>}
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
          .leftPanel {
            transition: all 250ms ease-in;
            transform: translateX(-100%);
            opacity: 0;
            overflow: hidden;
          }
          .leftPanel.IsOpen {
            transform: none;
            opacity: 1;
            overflow: auto;
          }
          .IconMenu,
          .IconHide,
          .IconHide label {
            transition: all 200ms ease-in;
          }
          .IconMenu:hover {
            opacity: 0.5;
            transform: translateX(1.5px);
          }
          .IconMenu:active {
            opacity: 1;
            transform: none;
          }
          .IconHide:hover {
            opacity: 0.5;
          }
          .IconHide:hover label {
            transform: translateX(-2px)
          }
          `
        }
      </style>
    </div>
  )
};


const IconLeftArrow = () => (
  <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L1 7.5L8 14" stroke="#718096" />
  </svg>
)

const IconMenu = () => (
  <svg width="22" height="24" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 1H22" stroke="#718096" />
    <path d="M0 7H22" stroke="#718096" />
    <path d="M0 13H22" stroke="#718096" />
  </svg>
)