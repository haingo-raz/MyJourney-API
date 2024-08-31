const sql = require('mssql');
require('dotenv').config();

// Configuration for the database connection
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433,
    database: process.env.DB_NAME,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};

console.log("Starting...");

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection failed: ', err);
    }
}

async function getUserByEmail(email, callback) {
    try {
        const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
        console.log(result.recordset[0]);
        return callback(null, result.recordset[0]);
    } catch (err) {
        return callback(err, null);
    }
}

async function signUp(res, email, password_crypted) {
    try {
        await sql.query`INSERT INTO users (email, password) VALUES (${email}, ${password_crypted})`;
        return res.json("Success");
    } catch (err) {
        return res.json(err);
    }
}

async function addWorkout(res, workout) {
    try {
        await sql.query`INSERT INTO workout (title, videoUrl, duration, user_email, dayCreated) VALUES (${workout.title}, ${workout.videoUrl}, ${workout.duration}, ${workout.user_email}, ${workout.dayCreated})`;
        return res.json("Success");
    } catch (err) {
        return res.json(err);
    }
}

async function editWorkoutById(res, workout) {
    try {
        await sql.query`UPDATE workout SET title = ${workout.title}, videoUrl = ${workout.videoUrl}, duration = ${workout.duration} WHERE workoutId = ${workout.workoutId}`;
        return res.json("Success");
    } catch (err) {
        return res.json(err);
    }
}

async function deleteWorkoutById(res, id) {
    try {
        await sql.query`DELETE FROM workout WHERE workoutId = ${id}`;
        return res.json("Success");
    } catch (err) {
        return res.json(err);
    }
}

async function getWorkoutByUserAndDate(res, email, date) {
    try {
        const aggregateResult = await sql.query`SELECT COUNT(*) AS workoutCount, SUM(duration) AS totalDuration FROM workout WHERE user_email = ${email} AND dayCreated = ${date}`;
        const detailsResult = await sql.query`SELECT * FROM workout WHERE user_email = ${email} AND dayCreated = ${date}`;
        
        const response = {
            count: aggregateResult.recordset[0].workoutCount,
            totalDuration: aggregateResult.recordset[0].totalDuration,
            workouts: detailsResult.recordset
        };

        return res.json(response);
    } catch (err) {
        return res.json(err);
    }
}

// Connect to the database
connectToDatabase();

module.exports.getWorkoutByUserAndDate = getWorkoutByUserAndDate;
module.exports.getUserByEmail = getUserByEmail;
module.exports.signUp = signUp;
module.exports.addWorkout = addWorkout;
module.exports.editWorkoutById = editWorkoutById;
module.exports.deleteWorkoutById = deleteWorkoutById;