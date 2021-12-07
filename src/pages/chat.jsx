import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { user } from '../user'
import PlusCircle from '../assets/svg/plus-circle.svg'
import './chat.css'

const ChatPage = () => {
  const [courseChats, setCourseChats] = useState([])
  const [selectedCourseChat, setSelectedCourseChat] = useState('')

  useEffect(() => {
    let tempCourseChats = ['English', 'Networking', 'Data Structures']
    user.get('courses').map().once((val, key) => {
      console.log(val, key)
      // tempCourseChats.append(findChat(course))
    })
    setCourseChats(tempCourseChats)
    setSelectedCourseChat(tempCourseChats[0])
  }, [])

  const logout = (e) => {
    user.leave()
    navigate('/', { replace: true })
  }

  return(
    <main className='chat-page'>
      <div className='side-bar'>
        <div className='chats'>
          {courseChats.map((courseChat) =>
            <button key={courseChat}>{courseChat}</button>
          )}
          <button className='add-course-chats' onClick={logout}>
            <PlusCircle width='22' />
            <p>Course Chats</p>
          </button>
        </div>
        <button className='logout' onClick={logout}>
          Log out
        </button>
      </div>
      <div className='chat'>
        Hello World
      </div>
    </main>
  )
}

export default ChatPage
