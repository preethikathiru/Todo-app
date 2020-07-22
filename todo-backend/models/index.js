/**
 * Framework imports
 */
const mongoose = require("mongoose")

/**
 * Connecting to the mongodb database name: "todo_app_details" 
 */
mongoose.connect("mongodb://TodoApp:TodoApp1@ds141178.mlab.com:41178/todo_app_details", {
  keepAlive: true, 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.set("debug", true) 
mongoose.Promise = Promise

/**
 * Requiring the todo model that we just created in mongodb
 */
module.exports.Todo = require("./todo")