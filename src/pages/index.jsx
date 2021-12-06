import React, { useState } from 'react'
// import { navigate } from 'gatsby'
import { user } from '../user'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    user.auth(email, pass, ({ err }) => err && alert(err))
  }

  return (
    <div className='signup'>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>Your Email</p>
          <input
            type='email'
            name='email'
            placeholder='doejohn@email.com'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Your Password</p>
          <input
            type='password'
            name='password'
            placeholder='***********'
            required
            onChange={e => setPass(e.target.value)}
          />
        </label>
        <input className='signup-submit' type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default LoginPage
