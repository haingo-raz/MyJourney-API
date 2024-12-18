import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as db from './database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

// Initialize express
const app = express()
const salt = 10
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('MyJourney Fitness API')
})

app.post('/login', login)
app.post('/signup', signUp)
app.post('/add', addWorkout)
app.post('/chat', chat)
app.post('/chat/ai', chatWithAI)

app.get('/workout/:email/:date', getWorkoutByUserAndDate)
app.get('/profile/:email', getProfileDetails)

app.put('/edit/:id', editWorkoutById)
app.put('/update-email', updateEmail)
app.put('/update-password', updatePassword)
app.put('/profile', addProfile)

app.delete('/delete/:id', deleteWorkoutById)
app.delete('/delete-account', deleteAccount)

async function login(req, res) {
    try {
        const userInfo = req.body
        db.getUserByEmail(userInfo.email, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    userInfo.password,
                    user.password
                )
                if (validPass) {
                    res.status(200).json({
                        message: 'Success',
                        email: user.email,
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid email or password',
                    })
                }
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function signUp(req, res) {
    const { email, password } = req.body
    const password_crypted = await bcrypt.hash(password, salt)

    if (email && password_crypted) {
        await db.signUp(res, email, password_crypted)
    } else {
        res.status(400).json({ error: 'Username and password are required' })
    }
}

function addWorkout(req, res) {
    let workout = req.body
    console.log('Workout: ', JSON.stringify(workout))
    if (
        workout.title &&
        workout.video_url &&
        workout.duration &&
        workout.user_email &&
        workout.day_created &&
        workout.status
    ) {
        db.addWorkout(res, workout)
            .then(() => console.log('added workout'))
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Internal server error' })
            })
    } else {
        res.status(400).json({
            error: 'Email, video_url, title and duration are required',
        })
    }
}

function editWorkoutById(req, res) {
    let workout = req.body
    if (workout) {
        db.editWorkoutById(res, workout)
    } else {
        res.status(400).json({
            error: 'Email, video_url, title and duration are required',
        })
    }
}

function deleteWorkoutById(req, res) {
    let id = req.params.id
    db.deleteWorkoutById(res, id)
}

function getWorkoutByUserAndDate(req, res) {
    let email = req.params.email
    let date = req.params.date
    db.getWorkoutByUserAndDate(res, email, date)
}

function updateEmail(req, res) {
    try {
        let email = req.body.email
        let newEmail = req.body.newEmail
        let password = req.body.password
        db.getUserByEmail(email, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(password, user.password)
                if (validPass) {
                    db.updateEmail(res, email, newEmail)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function updatePassword(req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        let newPassword = req.body.newPassword
        db.getUserByEmail(email, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(password, user.password)
                if (validPass) {
                    const new_password_crypted = await bcrypt.hash(
                        newPassword,
                        salt
                    )
                    db.updatePassword(res, email, new_password_crypted)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function deleteAccount(req, res) {
    try {
        let details = req.body

        db.getUserByEmail(details.email, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    details.password,
                    user.password
                )
                if (validPass) {
                    db.deleteAccount(res, details.email)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function chat(req, res) {
    try {
        const user_email = req.body.user_email
        const message = req.body.user_message
        let response = ''
        const lowerCaseMessage = message.toLowerCase()

        if (
            lowerCaseMessage.includes('hi') ||
            lowerCaseMessage.includes('hello') ||
            lowerCaseMessage.includes('hey') ||
            lowerCaseMessage.includes('good morning') ||
            lowerCaseMessage.includes('good afternoon') ||
            lowerCaseMessage.includes('good evening') ||
            lowerCaseMessage.includes('hello there')
        ) {
            response = 'Hello! Let me know how I can help you today.'
            res.json(response)
        } else if (
            lowerCaseMessage === 'ok' ||
            lowerCaseMessage === 'okay' ||
            lowerCaseMessage === 'thanks' ||
            lowerCaseMessage === 'thank you'
        ) {
            response = 'Great! Let me know if you have any other questions.'
            res.json(response)
        } else if (
            lowerCaseMessage.includes(
                'how many minutes have i spent working out since i started my journey?'
            )
        ) {
            db.getWorkoutMinutesCount(res, user_email)
        } else if (
            lowerCaseMessage.includes(
                'how many workout programs have i completed so far?'
            )
        ) {
            db.getWorkoutProgramsCount(res, user_email)
        } else if (
            lowerCaseMessage.includes(
                'how many days have i worked out since i started my journey?'
            )
        ) {
            db.getWorkoutDaysCount(res, user_email)
        } else if (
            lowerCaseMessage === 'bye' ||
            lowerCaseMessage === 'goodbye' ||
            lowerCaseMessage === 'see you later' ||
            lowerCaseMessage === 'see you' ||
            lowerCaseMessage === 'talk to you later'
        ) {
            response = 'Goodbye! Have a great day!'
            res.json(response)
        } else {
            response = 'Please choose one of the options provided.'
            res.json(response)
        }
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function addProfile(req, res) {
    let user_email = req.body.user_email
    let profileData = req.body.profileDataValue
    let profileDetails = {
        age: profileData.age || null,
        gender: profileData.gender || null,
        height: profileData.height || null,
        weight: profileData.weight || null,
        daily_intake_calorie: profileData.dailyIntakeCalorie || null,
        fitness_goals: profileData.fitnessGoals || null,
        weight_goal: profileData.weightGoal || null,
    }
    let updateFields = []
    for (let key in profileDetails) {
        if (profileDetails[key] !== null) {
            updateFields.push(`${key} = '${profileDetails[key]}'`)
        }
    }
    db.saveProfile(res, user_email, updateFields)
}

function getProfileDetails(req, res) {
    let user_email = req.params.email
    db.getProfileDetails(res, user_email)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function chatWithAI(req, res) {
    try {
        const chat = model.startChat({
            history: req.body.history,
        })
        const msg = req.body.message
        const result = await chat.sendMessage(msg)
        res.send(result.response.text())
    } catch (error) {
        console.error('Error in chatWithAI:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

export default app
