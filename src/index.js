const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { addUser, getUser, getUsersInRoom } = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', (options, callback) => {

        const { error, user } = addUser({ ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Chatbot', 'Welcome!'))
        // socket.broadcast.to(user.room).emit('message', generateMessage('Chatbot', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        socket.on('sendMessage', (message, callback) => {
            const user1 = getUser(user.room)
            const filter = new Filter()
        
            if (filter.isProfane(message)) {
                return callback('Profanity is not allowed!')
            }
        
            io.to(user1.room).emit('message', generateMessage(user.username, message))
            callback()
            
        })

        callback()
    })


})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

