import React from 'react';

import { GoogleLogin } from 'react-google-login';

export default () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId="398971931281-8r0rgrmtc5oqples56h0ims14b0giiec.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  )
}