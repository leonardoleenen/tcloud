import React, { useState } from 'react'
import uuid4 from 'uuid4'

interface Props {
  entity: LNEntity
}

const renderRows = (isExpanded, e: LNEntity) => {
  console.log(e)
  if (!isExpanded)
    return

  return (<div ><ul className='renderRowsItem'>
    <li key={uuid4()} className='text-sm text-gray-600'> {e.text}</li>
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
      `
      }
    </style>

  </div>
  )
}

const EntityCardDetail = (props: Props) => {

  const [isExpanded, collapase] = useState(true)
  return <div className="bg-white rounded-lg mainContainer py-6 px-4 mt-5">
    <header className=" flex">
      <label className="text-base font-semibold text-gray-800 mb-4 w-11/12" >{props.entity.display_name}</label>
      <div onClick={() => collapase(!isExpanded)} className='cursor-pointer expandIcon bg-gray-200 rounded justify-end w-5 h-5 flex content-center justify-center'>{isExpanded ? <CollapseIcon /> : <ExpandIcon />}</div>
    </header>
    {props.entity.values  ? props.entity.values.map((ev: LNEntityValue) => ev.entities.map( (e: LNEntity) => <EntityCardDetail entity={e} key={uuid4()} />)) : renderRows(isExpanded, props.entity)}

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

export default EntityCardDetail