import axios from 'axios'
import React, { useRef, useState } from 'react'

import { BACKEND_URL } from '../config'

function IndexPage (props) {
  const [tasks, setTask] = useState(props.tasks)
  const inputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const task = inputRef.current.value.trim()

    if (task !== '') {
      const response = await axios({
        method: 'post',
        url: `${BACKEND_URL}/tasks`,
        data: {
          task
        }
      })

      const { success, task: taskResponse } = response.data
      if (success) {
        setTask([...tasks, taskResponse])
        inputRef.current.value = ''
      }
    }
  }

  const handleClick = async ({ key, status, taskID }) => {
    let newStatus

    switch (status) {
      case 'pending':
        newStatus = 'done'
        break
      case 'done':
        newStatus = 'delete'
        break
      case 'delete':
        newStatus = 'pending'
        break
    }

    const response = await axios({
      method: 'patch',
      url: `${BACKEND_URL}/tasks/${taskID}`,
      data: { status: newStatus }
    })

    const { success, task } = response.data

    if (success) {
      tasks[key] = task
      setTask([...tasks])
    }
  }

  const handleDelete = async () => {
    const newTasks = tasks.filter(({ status }) => status !== 'delete')
    const response = await axios({
      method: 'delete',
      url: `${BACKEND_URL}/tasks/status`
    })

    const { success } = response.data

    if (success) {
      setTask(newTasks)
    }
  }

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={inputRef} />
      </form>

      <ul>
        {
          tasks.map(({ _id, task, status }, key) => {
            const style = { cursor: 'pointer' }

            if (status === 'done' || status === 'delete') {
              style.textDecoration = 'line-through'
            }

            if (status === 'delete') {
              style.color = 'red'
            }

            return (
              <li
                key={key}
                onClick={handleClick.bind(this, { key, taskID: _id, status })}
                style={style}
              >
                {task}
              </li>
            )
          })
        }
      </ul>

      {
        tasks.some(({ status }) => status === 'delete') &&
          <button onClick={handleDelete}>
            Clear deleted tasks
          </button>
      }
    </>
  )
}

export async function getStaticProps (context) {
  const response = await axios({
    method: 'get',
    url: `${BACKEND_URL}/tasks`
  })
  const { tasks } = response.data

  return {
    props: {
      tasks: tasks || []
    }
  }
}

export default IndexPage
