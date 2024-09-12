// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
const port = 9000

// GET Users 
server.get('/api/users', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            message: "Success GET of a User!",
            data: user,
        })
    } catch(error) {
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: error.message,
    })
    }
})


// GET 	/api/users/:id
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json({
            message: "Success GET of a User!",
            data: user,
            })
        }
    } catch (error) {
            res.status(500).json({
            message: "The user information could not be retrieved",
            error: error.message,
        })
    }           
})

// POST /api/users 
server.post('/api/users', async (req, res) => {
    
})

// PUT /api/users/:id

// DELETE 	/api/users/:id





//Listen to Port
server.listen(port, () => {
    console.log("Server running on http://localhost:9000")
})

module.exports = server // EXPORT YOUR SERVER instead of {}
