import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { user } from '../user'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    user.create(email, pass, ({ err }) => {
      if (err) {
        alert(err)
      } else {
        user.auth(email, pass)
        navigate('/chat', { replace: true })
      }
    })
  }

  return (
    <main className='signup-page'>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
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
    </main>
  )
}

export default SignupPage
