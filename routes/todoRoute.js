const express = require('express');
const { addTodo, upDateTodo, deleteTodo, getTodo, loginUserTodo } = require('../controller/todoController');
const auth = require('../middleware/authMiddleWare')

const router = express.Router();

router.post('/newTodo',auth, addTodo)

router.put("/update/:id", auth, upDateTodo);

router.delete("/delete/:id", auth, deleteTodo);

router.get("/getTodo", auth, getTodo);

router.get("/getSingleUserTodo", auth, loginUserTodo);


module.exports = router