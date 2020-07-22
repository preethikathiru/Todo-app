/**
 * Framework imports
 */
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

/**
 * Feature imports
 */
const db = require("./models/")

/**
 * Global Variable for port
 */
const PORT = process.env.PORT || 3000

/**
 * Setting up app from express
 */
const app = express()
app.use(cors())
app.use(bodyParser.json())

/**
 * Function to send success response
 * @param {Object} res 
 * @param {Object} payload 
 */
function success(res, payload) {
  return res.status(200).json(payload)
}

/**
 * Get API to get all TODOs
 */
app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({})
    
    return success(res, todos)
  } catch (err) {
    next({ status: 400, message: "Failed to get todos" })
  }
})

/**
 * Post API to save a new TODO
 */
app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body)
    return success(res, todo)
  } catch (err) {
      console.log(err);
    next({ status: 400, message: "Failed to create todo" })
  }
})

/**
 * Put API to update an existing TODO
 */
app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return success(res, todo)
  } catch (err) {
    next({ status: 400, message: "Failed to update todo" })
  }
})

/**
 * Delete API to delete a TODO
 */
app.delete("/todos/:id", async (req, res, next) => {
    console.log(req.params.id)
  try {
    await db.Todo.findByIdAndRemove(req.params.id)
    return success(res, "Todo deleted!")
  } catch (err) {
    next({ status: 400, message: "Failed to delete todo" })
  }
})

/**
 * Setting up express error handling
 */
app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "There was an error processing request",
  })
})

/**
 * Starting the server
 */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})