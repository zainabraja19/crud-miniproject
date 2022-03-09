const express = require('express');
const mongoose = require('mongoose');
const Task = require('./schema');

const app = express();

const mongo = "mongodb+srv://zainab:zainab2120@mycluster.h9yhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongo)
    .then((data) => {
        console.log("Connected to DB!")
        app.listen((3000), () => {
            console.log("Listening on port 3000!")
        })
    })
    .catch((err) => {
        console.log(err)
    })


// Create
const tasks = [{
    description: "Start a new Project!",
    completed: false
}, {
    description: "Check emails.",
    completed: true
}, {
    description: "Make Home Page responsive.",
    completed: false
}, {
    description: "Deploy the website.",
    completed: false
}]
Task.insertMany(tasks)
    .then((data) => {
        console.log("\nFollowing tasks are created:")
        for (var i = 0; i < data.length; i++) {
            console.log(`Task: ${data[i].description} --> Completed: ${data[i].completed} `)
        }
    })


// Read
setTimeout(() => {
    Task.find({ completed: false })
        .then((data) => {
            console.log("\nFollowing tasks are still remaining:")
            for (var i = 0; i < data.length; i++) {
                console.log(`Task: ${data[i].description} `)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}, 3000)


// Update
setTimeout(() => {
    Task.updateMany({ "completed": false }, { "$set": { "completed": true } })
        .then((data) => {
            console.log(`\nNumber of tasks updated: ${data.modifiedCount}\nMarked as completed`)
        })
}, 6000)


// Get ID of 2nd task
var id;
Task.findOne({ description: "Start a new Project!" })
    .then((data) => {
        id = data._id
    })
    .catch((err) => {
        console.log(err)
    })

// Delete
setTimeout(() => {
    Task.findByIdAndDelete(id)
        .then((data) => {
            console.log(`\nDeleted task: ${data.description} `)
        })
        .catch((err) => {
            console.log(err)
        })
}, 9000)

// setTimeout(() => {
//     Task.find()
//         .then((data) => {
//             console.log(data)
//         })
// }, 1500)


// Task.deleteMany({ completed: true })