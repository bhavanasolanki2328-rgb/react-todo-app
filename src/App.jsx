import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [input, setInput] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addOrUpdateTask = () => {
    if (input.trim() === "") return

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, text: input } : task
      )
      setTasks(updatedTasks)
      setEditIndex(null)
    } else {
      setTasks([...tasks, { text: input, completed: false }])
    }

    setInput("")
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const editTask = (index) => {
    setInput(tasks[index].text)
    setEditIndex(index)
  }

  return (
    <div className="container">
      <h1>My To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addOrUpdateTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add one above 👆</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(index)}>
                {task.text}
              </span>
              <div className="btn-group">
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App