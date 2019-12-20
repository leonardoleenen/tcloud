import React, { useState } from 'react'
import {setPosSelected, unSetPosSelected} from  '../redux/actions/document_viewer'
import {useDispatch} from 'react-redux'

interface Props {
  value: string
  id: string
  color: string
  entity: LNEntity
  callBackFunc(e: LNEntity): void // return id was toggled
}

export default (prop: Props) => {

  const [toogled, setToggled] = useState(false)
  const dispatch = useDispatch()

  return <div className={`button border rounded-full border-${prop.color}-700 w-auto  ${toogled ? 'text-white bg-' + prop.color + '-500' : 'text-' + prop.color + '-500  bg-white'}`} onClick={() => {
    setToggled(!toogled)
    prop.callBackFunc(prop.entity)
    let pos = null 

    if (prop.entity.values) 
      pos = prop.entity.values[0]['entities'][0]['pos'][0]
    else 
      pos = prop.entity.pos ? prop.entity.pos[0] : null 

    if (!toogled){
      pos ? dispatch(setPosSelected(pos.page.toString() + pos.line.toString())) : null 
      window.location.href=`#${pos ? pos.page.toString() + pos.line.toString() : '#'}`
    }else {
      pos ? dispatch(unSetPosSelected()) : null 
    }

   
      
  }}>
    <div className={`textAvatar rounded-full bg-${prop.color}-700 text-sm text-white flex items-center justify-center `}>{prop.value.trim().split(" ").map(a => a[0].toUpperCase()).join("")}</div>
    <label className={`ml-2 mr-4 cursor-pointer text-center text-sm font-semibold ${toogled ? 'text-white bg-' + prop.color + '-500' : 'text-' + prop.color + '-500  bg-white'} `} >{prop.value}</label>

    <style jsx>
      {`
      .button {
        // display: grid;
        // grid-template-columns: 1fr 3fr;
        // grid-gap: 20px;
        // width: min-content;
        // height: 32px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 200ms ease-in;
      }
      .button:hover {
        opacity: 0.7;
        transform: translateY(-1px)
      }
      .button label {
        transition: all 200ms ease-in;
      }
      .textAvatar {
        width: 32px;
        height: 32px;
      }
      `}
    </style>
  </div>
}