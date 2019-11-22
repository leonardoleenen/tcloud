import React, { useState } from 'react'
import dataProvider from '../service/index'
import { GoogleLogin } from 'react-google-login'
import Waiting from '../components/waiting'
import Router from 'next/router'


export default () => {

  const [pending, setPending] = useState(false)
  //const router = useRouter()

  const responseGoogle = (response) => {
    setPending(true)
    dataProvider.getUser(response.El).then( (u: UserOuttripper) => {
      if (u === undefined){
        Router.push('/pending_invitation')
        return 
      }
      switch(u.status) {
        case 'PENDING':
          Router.push('/pending_invitation')
          return 
        case 'CONFIRMED': 
          Router.push('/v/error_loading_file','/')
          break 
        default: 
          Router.push('/error_500')
          return
      }
    })
  }

  if (pending) return <Waiting/>

  //console.log('Dibuja')

  return (
    <div>
      <GoogleLogin
        clientId="398971931281-8r0rgrmtc5oqples56h0ims14b0giiec.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      
    </div>
  )
}