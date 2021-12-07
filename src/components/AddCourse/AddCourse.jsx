import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db, user } from '../../user'
import './addCourse.css'

const AddCourse = ({ updateCourses }) => {
  const [courses, setCourses] = useState([])
  const [newCourse, setNewCourse] = useState({})

  useEffect(() => {
    let tempCourses = []
    db.get('courses').map().once((course) => tempCourses.push(course))
    updateCourses()
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      setCourses(tempCourses)
    }, 1000)
  }, [])

  const createCourse = (e) => {
    e.preventDefault()
    const uuid = uuidv4()
    let tempNewCourse = { ...newCourse, id: uuid }
    db.get('courses').set(tempNewCourse)
    user.get('courses').set({ id: uuid })
    updateCourses()
  }

  const handleChange = (e) => setNewCourse({
    ...newCourse, [e.target.name]: e.target.value
  })

  const addCourse = (c) => {
    let isNewCourse = true
    user.get('courses').map().once(({ id }) => {
      if (id === c.id) isNewCourse = false
    })
    // async is broken for once (I spent an hour on this lol)
    setTimeout(() => {
      if (!isNewCourse) {
        alert('You are already in this course!')
        return
      }
      user.get('courses').set({ 'id': c.id })
      updateCourses()
    }, 1000)
  }

  return (
    <div className='create-course-form-wrapper'>
      {/* <h1>Create a Course</h1>
      <form onSubmit={createCourse}>
        <label>
          <p>Course Name</p>
          <input
            type='text'
            name='name'
            required
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Department Name</p>
          <input
            type='text'
            name='depName'
            required
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Course Number</p>
          <input
            type='number'
            name='number'
            required
            onChange={handleChange}
          />
        </label>
        <label>
          <p>School</p>
          <input
            type='text'
            name='school'
            required
            onChange={handleChange}
          />
        </label>
        <input className='create-course-submit' type='submit' value='Create' />
      </form> */}
      {courses.length > 0 && <div className='chats'>
        <h1>Add a Course</h1>
        {courses.map((c) =>
          <button key={c.name} onClick={() => addCourse(c)}>
            <span>{`${c.school}: ${c.depName} ${c.number}`}</span>
            <div>{c.name}</div>
          </button>
        )}
      </div>}
    </div>
  )
}

export default AddCourse
