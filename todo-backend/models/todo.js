/**
 * Framework imports
 */
const mongoose = require("mongoose")

/**
 * Creating a schema for todo
 */
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

/**
 * Creating the model from the schema
 */
const todoModel = mongoose.model("Todo", todoSchema) 

/**
 * Exporting the model
 */
module.exports = todoModel