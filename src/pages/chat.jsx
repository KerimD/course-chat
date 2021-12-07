import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { db, user } from '../user'
import { v4 as uuidv4 } from 'uuid'
import AddCourse from '../components/AddCourse'
import PlusCircle from '../assets/svg/plus-circle.svg'
import './chat.css'

const ChatPage = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const updateCourses = () => {
    let tempCourses = []
    user.get('courses').map().once(({ id }) => {
      db.get('courses').map().once((course) =>
        id === course.id && tempCourses.push(course)
      )
    })
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      setCourses(tempCourses)
      tempCourses.length && setSelectedCourse(tempCourses[0])
      tempCourses.forEach((course) => {
        db.get('chats').get(course.id).map().on((message) => {
          let tempMessages = []
          db.get('chats').get(course.id).map().once((m) => {
            tempMessages.push(m)
          })
          // async is broken for once (I spent an hour on this lol)
          setTimeout(() => {
            setMessages(tempMessages)
          }, 1000)
        })
      })
    }, 1000)
  }

  const subscribeToMessages = () => {
    let tempCourses = []
    user.get('courses').map().once(({ id }) => {
      db.get('courses').map().once((course) =>
        id === course.id && tempCourses.push(course)
      )
    })
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      setCourses(tempCourses)
      tempCourses.length && setSelectedCourse(tempCourses[0])
      tempCourses.forEach((course) => {
        db.get('chats').get(course.id).map().on((message) => {
          let tempMessages = []
          db.get('chats').get(course.id).map().once((m) => {
            tempMessages.push(m)
          })
          // async is broken for once (I spent an hour on this lol)
          setTimeout(() => {
            console.log(tempMessages)
            setMessages(tempMessages)
          }, 1000)
        })
      })
    }, 1000)
  }

  useEffect(() => {
    let isNewCourse = true
    user.get('courses').map().once(({ id }) => {
      isNewCourse = false
    })
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      if (isNewCourse) {
        const uuid = uuidv4()
        let tempNewCourse = {
          name: 'Networking',
          depName: 'CS',
          number: '5600',
          school: 'MST',
          id: uuid
        }
        db.get('courses').set(tempNewCourse)
        user.get('courses').set({ id: uuid })
      }
    }, 1000)
    subscribeToMessages()
  }, [])

  const sendMessage = () => {
    let alias = ''
    user.get('alias').once((data) => alias = data)
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      db.get('chats').get(selectedCourse.id).set({
        author: alias,
        content: message
      })
    }, 1000)
  }

  const logout = (e) => {
    user.leave()
    navigate('/', { replace: true })
  }

  // console.log(messages)
  return(
    <main className='chat-page'>
      <div className='side-bar'>
        {courses.length > 0 && selectedCourse != undefined && <div className='chats'>
          {courses.map((c) =>
            <button
              className={`${c.id === selectedCourse.id && 'selected-btn'}`}
              key={c.name}
              onClick={() => setSelectedCourse(c)}>
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
        </div>}
        <button className='logout' onClick={logout}>
          Log out
        </button>
      </div>
      {selectedCourse
        ? <div className='chat'>
            <div className='messages'>
              {messages.map((m) =>
                <div key={uuidv4()} className='message'>
                  <p>{m.author}</p>
                  <div>{m.content}</div>
                </div>)}
            </div>
            <div className='user-message'>
              <input type='text' onChange={(e) => setMessage(e.target.value)} />
              <button className='send-btn' onClick={sendMessage}>Send</button>
            </div>
          </div>
        : <AddCourse updateCourses={updateCourses} />}
    </main>
  )
}

export default ChatPage
