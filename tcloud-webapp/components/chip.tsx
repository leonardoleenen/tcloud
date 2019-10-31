import React from 'react'

interface Props {
  label : string 
}
export default (props: Props) => {

  return (
    <div>
      {props.label}
    </div>
  )
}