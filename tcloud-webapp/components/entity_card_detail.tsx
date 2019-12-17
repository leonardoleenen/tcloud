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
    <div ><ul className='renderRowsItem flex hover:bg-gray-200 justify-between relative' onMouseOver={ () => setEntitySelected(e)} onMouseLeave={ () => setEntitySelected(null)}>
      <a href={`#${e.pos && e.pos.length > 0 ? e.pos[0].page.toString() + e.pos[0].line.toString() : '#'}`}>
        <li key={uuid4()} className='text-sm text-gray-600'>{e.text}</li>
      </a>

      {entitySelected  && entitySelected.text === e.text ? <div className="flex items-center absolute right-0 top-0"> <Clipboard className="mr-1 cursor-pointer" data-clipboard-text={e.text}><CopyIcon /></Clipboard> <EditIcon /> </div>: ''}
      

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

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="18" height="18" rx="4" stroke="#718096" stroke-width="2"/>
    <path fillRule="evenodd" clip-rule="evenodd" d="M10 13.5C10 13.2239 10.1513 13 10.3378 13H14.6622C14.8487 13 15 13.2239 15 13.5C15 13.7761 14.8487 14 14.6622 14H10.3378C10.1513 14 10 13.7761 10 13.5Z" fill="#718096" stroke="#718096" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fillRule="evenodd" clip-rule="evenodd" d="M12.628 5.6831C12.4453 5.6831 12.2701 5.75568 12.1409 5.88488L6.13573 11.89L5.81098 13.189L7.10999 12.8643L13.1151 6.85914C13.1791 6.79517 13.2298 6.71922 13.2645 6.63564C13.2991 6.55206 13.3169 6.46248 13.3169 6.37201C13.3169 6.28154 13.2991 6.19196 13.2645 6.10838C13.2298 6.02479 13.1791 5.94885 13.1151 5.88488C13.0512 5.82091 12.9752 5.77016 12.8916 5.73554C12.808 5.70092 12.7185 5.6831 12.628 5.6831ZM11.6578 5.40185C11.9151 5.14455 12.2641 5 12.628 5C12.8082 5 12.9866 5.03549 13.153 5.10444C13.3195 5.17339 13.4707 5.27445 13.5981 5.40185C13.7256 5.52925 13.8266 5.6805 13.8956 5.84696C13.9645 6.01342 14 6.19183 14 6.37201C14 6.55218 13.9645 6.73059 13.8956 6.89705C13.8266 7.06351 13.7256 7.21476 13.5981 7.34217L7.52612 13.4142C7.48235 13.458 7.4275 13.489 7.36745 13.504L5.4244 13.9898C5.30801 14.0189 5.18488 13.9848 5.10005 13.9C5.01521 13.8151 4.98111 13.692 5.01021 13.5756L5.49597 11.6326C5.51098 11.5725 5.54203 11.5177 5.58581 11.4739L11.6578 5.40185Z" fill="#718096" stroke="#718096" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export default EntityCardDetail