const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delete', 'done'],
    required: true
  }
}, { timestamps: true })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
