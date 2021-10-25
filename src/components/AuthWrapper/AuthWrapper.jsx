import React, { useEffect } from "react";
// import { navigate } from "gatsby"

const AuthWrapper = ({ children }) => {
  useEffect(() => {
    // let path = window.location.pathname.substring(1)
    // console.log(children)

    // if logged in
    // navigate('/chat', { replace: true })
    // if not logged in and path is chat
    // navigate('/', { replace: true })
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default AuthWrapper
