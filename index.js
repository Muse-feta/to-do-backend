const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const userSchema = require('./Model/userSchema')
const userRouter = require('./routes/userRoute')
const todoRouter = require('./routes/todoRoute')

const app = express();
const PORT = process.env.PORT
const URI = process.env.URI

// middlewares
app.use(express.json());
app.use(cors())

// userMiddleWare
app.use('/api/users',userRouter)

// todoMiddleWare
app.use('/api/todo', todoRouter)

// connect to mongodb
mongoose.connect(URI).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT} and connect to mongoDB`)
    })
}).catch((err) => {
    console.log(err)
})


