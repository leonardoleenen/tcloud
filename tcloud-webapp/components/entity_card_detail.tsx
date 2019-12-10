import React, { useState } from 'react'
import uuid4 from 'uuid4'
import Clipboard from 'react-clipboard.js';

interface Props {
  entity: LNEntity
}


const renderRows = (isExpanded, e: LNEntity) => {
  const [entitySelected, setEntitySelected] = useState<LNEntity>(null)

  if (!isExpanded)
    return

  return (
    <div ><ul className='renderRowsItem flex hover:bg-gray-200' onMouseOver={ () => setEntitySelected(e)} onMouseLeave={ () => setEntitySelected(null)}>
      <a href={`#${e.pos && e.pos.length > 0 ? e.pos[0].page.toString() + e.pos[0].line.toString() : '#'}`}>
        <li key={uuid4()} className='text-sm text-gray-600'>{e.text}</li>
      </a>

      {entitySelected  && entitySelected.text === e.text ? <div className="flex justify-end"> <Clipboard data-clipboard-text={e.text}><CopyIcon /></Clipboard> </div>: ''}
      

    </ul>

      <style jsx>
        {

          `
      .renderRowsItem {
        margin-bottom: 10px;
        padding-left: 13px;
        position: relative;
      }
      .renderRowsItem:last-child {
        margin-bottom: 0;
      }
      .renderRowsItem:before {
        content: '';
        width: 6px;
        height: 6px;
        background: #667EEA;
        border-radius: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
      }
      .renderRowsItem a {
        margin-right: 10px
      }
      `
        }
      </style>

    </div>
  )
}

const EntityCardDetail = (props: Props) => {

  const [isExpanded, collapase] = useState(true)
  return <div className="bg-white rounded-lg mainContainer py-6 px-4 mt-5 entity-card">
    <header className=" flex">
      <label className="text-base font-semibold text-gray-800 mb-4 w-11/12" >{props.entity.display_name}</label>
      <div onClick={() => {
        console.log(isExpanded)
        collapase(!isExpanded)
      }} className='cursor-pointer expandIcon bg-gray-200 rounded justify-end w-5 h-5 flex content-center justify-center'>{isExpanded ? <CollapseIcon /> : <ExpandIcon />}</div>
    </header>
    {props.entity.values ? props.entity.values.map((ev: LNEntityValue) => ev.entities.map((e: LNEntity) => <EntityCardDetail entity={e} key={uuid4()} />)) : renderRows(isExpanded, props.entity)}

    <style jsx>
      {

        `
        .expandIcon {
          box-shadow: 0px 0.625px 1.875px rgba(0, 0, 0, 0.08);
          transition: all 200ms ease-in;
        }
        .expandIcon:hover {
          opacity: 0.7;
          transform: translateY(-1px)
        }
        .entity-card > .entity-card {
          padding: 0;
          margin: 0 0 15px;
        }
        .entity-card > .entity-card .expandIcon {
          display: none;
        }
        .entity-card > .entity-card header > label {
          margin-bottom: 5px;
        }

        /*
        .mainContainer {
          display: grid;
          grid-template-rows: 30px 1fr; 
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }

        ul.li {
          list-style-position: inside;
        }

        header {
          // display:grid; 
          // grid-template-columns: 1fr 20px;
          
        }



        li::before {
          content: "•"; 
          color: #667EEA;
          display: inline-block; 
          font-size: 1.5em; 
          width: 0.8em;
        }*/
        `
      }
    </style>
  </div>
}

const CollapseIcon = () => (
  <svg style={{ margin: 'auto' }} width="10" height="6" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 5.1875L5.3125 1.125L9.375 5.1875" stroke="#667EEA" strokeWidth="1.25" />
  </svg>
)

const ExpandIcon = () => (
  <svg style={{ margin: 'auto' }} className=" justify-center" width="10" height="6" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.75 0.8125L4.6875 4.875L0.625 0.8125" stroke="#667EEA" strokeWidth="1.25" />
  </svg>

)


const CopyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/copy">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M9 13V12C9 10.346 10.346 9 12 9H13V5.667C13 5.299 12.701 5 12.333 5H5.667C5.299 5 5 5.299 5 5.667V12.333C5 12.701 5.299 13 5.667 13H9ZM9 15H5.667C4.196 15 3 13.804 3 12.333V5.667C3 4.196 4.196 3 5.667 3H12.333C13.804 3 15 4.196 15 5.667V9H18C19.654 9 21 10.346 21 12V18C21 19.654 19.654 21 18 21H12C10.346 21 9 19.654 9 18V15ZM11 12C11 11.449 11.449 11 12 11H18C18.552 11 19 11.449 19 12V18C19 18.551 18.552 19 18 19H12C11.449 19 11 18.551 11 18V12Z" fill="#231F20" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M9 13V12C9 10.346 10.346 9 12 9H13V5.667C13 5.299 12.701 5 12.333 5H5.667C5.299 5 5 5.299 5 5.667V12.333C5 12.701 5.299 13 5.667 13H9ZM9 15H5.667C4.196 15 3 13.804 3 12.333V5.667C3 4.196 4.196 3 5.667 3H12.333C13.804 3 15 4.196 15 5.667V9H18C19.654 9 21 10.346 21 12V18C21 19.654 19.654 21 18 21H12C10.346 21 9 19.654 9 18V15ZM11 12C11 11.449 11.449 11 12 11H18C18.552 11 19 11.449 19 12V18C19 18.551 18.552 19 18 19H12C11.449 19 11 18.551 11 18V12Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="24" height="24" fill="#718096" />
        </g>
      </g>
    </g>
  </svg>
)

export default EntityCardDetail