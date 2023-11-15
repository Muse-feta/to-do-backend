const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const auth = (req,res,next) => {
    const header = req.headers.authorization

        if (!header || !header.startsWith("Bearer")) {
            res.status(401).json({ message: "unautohrized user" });
        }
        
        // const data = jwt.verify(token, SECRET_KEY);
        const token = header.split(" ")[1];
        

    try {
        // return res.status(500).json(data)
        const {username, userid} = jwt.verify(token, SECRET_KEY)
        req.user = {username, userid}
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = auth