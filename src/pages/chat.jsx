import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { db, user } from '../user'
import AddCourse from '../components/AddCourse'
import PlusCircle from '../assets/svg/plus-circle.svg'
import './chat.css'

const ChatPage = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState()

  const updateCourses = () => {
    let tempCourses = []
    user.get('courses').map().once(({ uuid }) => {
      db.get('courses').map().once((course) =>
        uuid === course.uuid && tempCourses.push(course)
      )
    })
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      setCourses(tempCourses)
      tempCourses.length && setSelectedCourse(tempCourses[0])
    }, 1000)
  }

  useEffect(() => {
    updateCourses()
  }, [])

  const logout = (e) => {
    user.leave()
    navigate('/', { replace: true })
  }

  return(
    <main className='chat-page'>
      <div className='side-bar'>
        <div className='chats'>
          {courses.map((c) =>
            <button key={c.name} onClick={() => setSelectedCourse(c)}>
              <span>{`${c.school}: ${c.depName} ${c.number}`}</span>
              <div>{c.name}</div>
            </button>
          )}
          <button
            className='add-courses'
            onClick={() => setSelectedCourse()}
          >
            <PlusCircle width='22' />
            <p>Course Chat</p>
          </button>
        </div>
        <button className='logout' onClick={logout}>
          Log out
        </button>
      </div>
      {selectedCourse
        ? <div className='chat'>
            {selectedCourse.name}
          </div>
        : <AddCourse updateCourses={updateCourses} />}
    </main>
  )
}

export default ChatPage
