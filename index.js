const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./database')
const bcrypt = require('bcrypt');
require('dotenv').config();


// Initialize express
const app = express()
const salt = 10;
app.use(cors())
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("MyJouney Fitness API")
})

app.post("/login", login)
app.post("/signup", signUp)
app.post("/add", addWorkout)

app.get("/workout/:email/:date", getWorkoutByUserAndDate)

app.put("/edit/:id", editWorkoutById)

app.delete("/delete/:id", deleteWorkoutById)

async function login(req, res){
    try{
        const userInfo =req.body;
        // Retrieve the user from the database from the email
        db.getUserByEmail(userInfo.email, async (err, user) => { 
            if(err){
                console.log("Error: ", err)
                res.status(500).json({ message: "Internal server error" })
            } else if(user){
                const validPass = await bcrypt.compare(userInfo.password, user.password)
                if(validPass){
                    res.status(200).json({ message: "Success", email: user.email });
                } else {
                    res.json("Invalid email or password")
                }
            } else {
                res.status(400).json("User not found")
            }
        })
    } catch(err){
        console.log("Error: ", err)
    }
}

async function signUp(req, res){
    const {email, password}=req.body;

    // encrypt password before storing into database
    const password_crypted = await bcrypt.hash(password,salt);

    if (email && password_crypted) {
        db.signUp(res, email, password_crypted)
    } else {
        res.status(400).json({ error: 'Username and password are required' });
    }
}

function addWorkout(req, res){
    let workout = req.body;
    console.log("Workout: ", JSON.stringify(workout))
    if (workout) {
        db.addWorkout(res, workout)
    } else {
        res.status(400).json({ error: 'Email, videoUrl, title and duration are required' });
    }
}

function editWorkoutById(req, res){
    let workout = req.body;
    console.log("Workout to edit: ", JSON.stringify(workout))
    if (workout) {
        db.editWorkoutById(res, workout)
    } else {
        res.status(400).json({ error: 'Email, videoUrl, title and duration are required' });
    }
}

function deleteWorkoutById(req, res){
    let id = req.params.id;
    console.log("Workout to delete ID: ", id)
    db.deleteWorkoutById(res, id)
}

function getWorkoutByUserAndDate(req, res){
    let email = req.params.email;
    let date = req.params.date;
    db.getWorkoutByUserAndDate(res, email, date)
}

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080")
})