const mongoose = require('mongoose')
const { userModel, listModel, workspaceModel } = require('../models')
const { encrypt } = require('../utils/encryption')
// require('dotenv').config({ path: './.env.local' });

const dbURI = process.env.DB_URI //Env variable that contains the DB URI
mongoose.connect(dbURI)

const dbConnection = mongoose.connection

dbConnection.on('connected', async () => {
    
    console.log('MongoDB successfully connected')

    const users = await userModel.countDocuments();
    const lists = await listModel.countDocuments();
    const workspaces = await workspaceModel.countDocuments();
    
    if (users === 0) {
        // Insert initial data
        const password = await encrypt("1234");
        const usersArr = await userModel.insertMany([
            { 
                name: "Admin",
                email: "admin@gmail.com",
                password,
                role: "admin"
            },
            { 
                name: "Guess",
                email: "guess@gmail.com",
                password,
                role: "user"
            }
        ]);
        const userIds = usersArr.map(user => user._id.toString());
        console.log("User IDs:", userIds);
        console.log("Added default users", usersArr);

        if(workspaces !== 0) return
        const workspacesArr = await workspaceModel.insertMany([
            { 
                name: "Admin",
                color: "#6477E2"
            },
            { 
                name: "Guess",
                color: "#C576DB"
            }
        ]);
        const workspaceIds = workspacesArr.map(workspace => workspace._id.toString());
        console.log("workspace IDs:", workspaceIds);
        console.log("Added default workspaces", workspacesArr);

        if (lists !== 0) return
        await listModel.insertMany([
            { 
                title: "Home",
                userId: userIds[0],
                workspaceId: workspaceIds[0]
            },
            { 
                title: "Completed",
                userId: userIds[1],
                workspaceId: workspaceIds[1]
            }
        ]);
    }
})
dbConnection.on('error', () => {
    console.log('An error has ocurred while connecting MongoDB')
})

module.exports = mongoose