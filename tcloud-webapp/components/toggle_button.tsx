import React, { useState } from 'react'

interface Props {
  value: string
  id: string
  color: string
  entity: LNEntity
  callBackFunc(e: LNEntity): void // return id was toggled
}

export default (prop: Props) => {

  const [toogled, setToggled] = useState(false)

  return <div className={`button border rounded-full border-${prop.color}-700 w-auto  ${toogled ? 'text-white bg-' + prop.color + '-500' : 'text-' + prop.color + '-500  bg-white'}`} onClick={() => {
    setToggled(!toogled)
    prop.callBackFunc(prop.entity)
    if (!toogled){
      if (prop.entity.values) {
        const pos = prop.entity.values[0]['entities'][0]['pos'][0]
        window.location.href=`#${pos.page.toString() + pos.line.toString() }`
      }else {
        window.location.href=`#${prop.entity.pos ? prop.entity.pos[0].page.toString() + prop.entity.pos[0].line.toString() : '#'}`
      }
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