// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())
const port = 9000

// GET Users 
server.get('/api/users', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            message: "Successful GETting Users!",
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
    try {
        const {name, bio} = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await User.insert({ name, bio})
            res.status(201).json({
                message: "Success POST of a User!",
                data: newUser,
                })
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: error.message,
        })
    }
})


// DELETE 	/api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const removeUser = await User.remove(id)

        if(!removeUser) {
            return res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json({
                message: "User was removed successfully",
                // data: removeUser
            })
        }
    } catch (error) {
        res.status(500).json({
                        message: `Error deleting dog: ${error.message}`,
                    })
    }
})

// PUT /api/users/:id
server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name , bio } = req.body

        if (!name || !bio) {
            return res.status(400).json({
                message: `The user with the specified ${id} does not exist`
            })

        } 
        const updateUser = await User.update(id, {name, bio})
        
        if (!updateUser) {
              return res.status(400).json({
                    message:  "Please provide name and bio for the user"
                })
            }
        
        res.status(200).json({
            message: "User updated successfully",
            data: updateUser
        })    


    } catch (error) {
        res.status(500).json({
            message: "The user information could not be modified",
        })
    }
})


//Listen to Port
server.listen(port, () => {
    console.log("Server running on http://localhost:9000")
})

module.exports = server // EXPORT YOUR SERVER instead of {}
