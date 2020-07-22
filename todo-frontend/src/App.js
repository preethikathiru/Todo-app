/**
 * Framework imports
 */
import React, { useState, useEffect } from "react"

/**
 * Feature imports
 */
import "./App.css"
import APIHelper from "./APIHelper.js"

/**
 * Main Function
 */
function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [sortType, setSortType] = useState(todos);
  
  /**
   * Initialiing the todo list
   */
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, [])

  /**
   * Sort function 
   */
  useEffect(() => {
    const sortArray = type => {
      if(type==='newest'){
        const sorted = todos.sort(function(a, b) { return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0); }); 
        setTodos(sorted);
      }
      else{
        const sorted = todos.sort(function(b, a) { return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0); }); 
        setTodos(sorted);
      }
    };
    sortArray(sortType);
  }, [sortType, todos]);

   /**
    * Create TODO function
    * @param {*} e Onclick event
    */ 
  const createTodo = async e => {
    e.preventDefault()
    if (!todo) {
      alert("please enter something")
      return
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await APIHelper.createTodo(todo)
    setTodos([...todos, newTodo])
  }

  /**
   * Delete TODO function
   * @param {*} e Onclick event
   * @param {String} id TODO id
   */
  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  /**
   * Update TODO function
   * @param {*} e Onclick event
   * @param {*} id TODO id
   */
  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  /**
   * Return the HTML component
   */
return (
    
    <body className="body">
      <h2>Your Daily Task are listed below</h2>
      
    <div className="App">
      <div>
        <input
          id="todo-input"
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button className="App_button" type="button" onClick={createTodo}>
          Add Task
        </button>
      </div>
      <div className="sortTodos">
      <span><p>Sort by order</p></span>
        <select>
          <option selected disabled>Select an option</option>
          <option value="newest" onClick={(e) => setSortType(e.target.value)}>Newest</option>
          <option value="oldest" onClick={(e) => setSortType(e.target.value)}>Oldest</option>
        </select>
      </div>
      
      <div>
      {todos.map(({ _id, task,completed, createdAt }, i) => (
          <div className="card" >
          <p>Task: {task}</p>
          <p>Created: {createdAt}</p>
          <p> {completed ? <p>Status: Completed <span><button onClick={e => updateTodo(e, _id)}>Mark as pending</button></span></p> : <p>Status: Pending <span><button onClick={e => updateTodo(e, _id)}>Mark as completed</button></span></p>}</p>
          <button className="delete" onClick={e => deleteTodo(e, _id)}>Delete</button>
        </div>
        ))}
      
      </div>
        
    </div>
    </body>
  )
}

/**
 * Export the app
 */
export default App