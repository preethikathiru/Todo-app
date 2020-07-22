/**
 * Framework imports
 */
import axios from "axios"

/**
 * Global Variables
 */
const API_URL = "http://localhost:3000/todos/"

/**
 * Helper to create a new TODO
 * @param {Object} task TODO data
 */
async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task,
  })
  return newTodo
}

/**
 * Helper to delete a TODO
 * @param {String} id TODO id
 */
async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

/**
 * Helper to Update an existing TODO
 * @param {String} id TODO id
 * @param {Object} payload New TODO data
 */
async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

/**
 * Helper to get all TODOs
 */
async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

/**
 * Export all the helper functions
 */
export default { createTodo, deleteTodo, updateTodo, getAllTodos }