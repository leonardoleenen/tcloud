import React,{useState} from 'react'

interface Props {
  value: string 
  id:string
  color: string
  callBackFunc(id:string): void // return id was toggled
}

export default (prop: Props) => {

  const [toogled,setToggled] = useState(false)

  return <div className={`button border rounded-full border-${prop.color}-700 w-auto  ${toogled ? 'text-white bg-' + prop.color+ '-500' : 'text-' + prop.color+ '-500  bg-white'}`}onClick={ () =>{
    setToggled(!toogled)
    prop.callBackFunc(prop.id)
  }}>
    <div  className={`textAvatar rounded-full bg-${prop.color}-700 text-center text-sm text-white font-semibold  `}>{prop.value.trim().split(" ").map( a => a[0].toUpperCase()).join("")}</div>
    <label className={`ml-2 mr-4 text-center text-sm font-semibold ${toogled ? 'text-white bg-' + prop.color+ '-500' : 'text-' + prop.color+ '-500  bg-white'} `} >{prop.value}</label>

    <style jsx>
      {`
      .button {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 20px;
        // width: min-content;
        height: 32px
      }
      .textAvatar {
        width: 32px
      }
      `}
    </style>
  </div>
}