// const level = require('level')
// const db = level('my-db')
const users = []

const addUser = ({ username, room }) => {

    const user = {username, room}

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user - ROOM
    const existingUser = users.find((user) => {
        return user.room === room && user.username !== username
    })

    
    // Validate username
    if (existingUser) {
        
    return {error: "User name is incorrect / E-Mail already exists"}
} 

// Existing User Credentials
    const existingUser1 = users.find((user) => {
    return user.room === room && user.username === username
})


// Validate username
if (!existingUser1) {
    users.push(user)
    console.log (users)
    return { user }
}
    console.log (users)
    return { user }
}

    

const getUser = (room) => {
    return users.find((user) => user.room === room)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
   
}
module.exports = {
    addUser,
    getUser,
    getUsersInRoom
}