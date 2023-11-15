const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  newTodo: { type: String, required: true, maxLength: 8 },
  username: { type: String, required: true },
  todoDate: { type: Date, default: Date.now },
});

const todoSchema = mongoose.model('todo', schema)

module.exports = todoSchema