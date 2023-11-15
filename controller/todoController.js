const todoSchema = require('../Model/todoSchema');
const userSchema = require('../Model/userSchema');

const addTodo = async (req, res) => {
    const {newTodo, username} = req.body

     if (newTodo === "") {
       return res
         .status(500)
         .json({ message: "please provide all required field" });
     }
     if(newTodo.length > 8){
         return res
           .status(500)
           .json({ message: "please provide only 8 charachters" });
     }

    try {
        const createTodo = await new todoSchema({newTodo ,username})
        createTodo.save()

        return res.status(201).json({createTodo})
    } catch (error) {
        res.status(500).json(error)
    }
};

const upDateTodo = async (req,res) => {
    const id = req.params.id
    const {newTodo, username} = req.body

    if(newTodo === ''){
        return res.status(500).json({message: "please provide all required field"})
    }
    try {
        const updateTodo = await todoSchema.findByIdAndUpdate(id,{
             newTodo: newTodo,
             username: username
        })

        return res.status(200).json({updateTodo})
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
}

const deleteTodo =async (req,res) => {
   try {
     const todoId = req.params.id;

     // Use Mongoose's findByIdAndDelete method to delete the todo by ID
     const deletedTodo = await todoSchema.findByIdAndDelete(todoId);

     if (!deletedTodo) {
       return res.status(404).json({ message: "Todo not found" });
     }

     res.status(200).json({ message: "Todo deleted successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal server error" });
   }
}

const getTodo = async (req,res) => {
    try {
        const getTodo = await todoSchema.find().sort({ newTodo: -1 }).exec();
        res.status(200).json({getTodo})
    } catch (error) {
        res.status(500).json({message: "it's not getteng todos"})
    }
}

const loginUserTodo = async(req, res) => {
    const username = req.user.username
    const getUserTodo = await userSchema.findOne({username})
    const user = getUserTodo.username

   
    try {
         if (username === user) {
           const singleUserTodo = await todoSchema.find({ username });
           res.status(200).json({ singleUserTodo });
         } else {
           res.status(401).json({ message: "no matched user and todo" });
         } 
    } catch (error) {
        res.status(500).json({message: 'no matched user and todo'})
    } 
} 

module.exports = { addTodo, upDateTodo, deleteTodo, getTodo, loginUserTodo};
