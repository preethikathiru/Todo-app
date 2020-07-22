/**
 * Framework imports
 */
const mongoose = require("mongoose")

/**
 * Connecting to the mongodb database name: "todo_app_details" 
 */
mongoose.connect("", {
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