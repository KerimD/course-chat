import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { user } from '../../user'

const AuthWrapper = ({ children }) => {
  useEffect(() => {
    let path = window.location.pathname.substring(1)
    if (user.is) {
      navigate('/chat', { replace: true })
    } else if (path === 'chat') {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default AuthWrapper
