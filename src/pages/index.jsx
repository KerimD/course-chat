import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { user } from '../user'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    user.auth(email, pass, ({ err }) =>
      err ? alert(err) : navigate('/chat', { replace: true })
    )
  }

  return (
    <main className='auth-page-wrapper'>
      <form onSubmit={handleLogin}>
        <label>
          <p>Your Email</p>
          <input
            type='email'
            name='email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Your Password</p>
          <input
            type='password'
            name='password'
            required
            onChange={e => setPass(e.target.value)}
          />
        </label>
        <input className='signup-submit' type='submit' value='Log in' />
      </form>
    </main>
  )
}

export default LoginPage
