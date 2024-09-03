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
        const query = `INSERT INTO workout (title, videoUrl, duration, user_email, dayCreated, status) VALUES ('${workout.title}', '${workout.videoUrl}', ${workout.duration}, '${workout.user_email}', '${workout.dayCreated}', '${workout.status}')`;
        await sql.query(query);
        return res.json("Success");
    } catch (err) {
        console.log("Error executing query: ", err);
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

async function updateEmail(res, email, newEmail) {
    const transaction = new sql.Transaction();
    try {
        await transaction.begin();
        // Disable the foreign key constraint
        await transaction.request().query(`ALTER TABLE workout NOCHECK CONSTRAINT FK_users`);
        // Update the email in the workout table first
        await transaction.request().query(`UPDATE workout SET user_email = '${newEmail}' WHERE user_email = '${email}'`);
        // Update the email in the users table
        await transaction.request().query(`UPDATE users SET email = '${newEmail}' WHERE email = '${email}'`);
        // Re-enable the foreign key constraint
        await transaction.request().query(`ALTER TABLE workout CHECK CONSTRAINT FK_users`);
        await transaction.commit();
        return res.json("Success");
    } catch (err) {
        await transaction.rollback();
        return res.json(err);
    }
}

async function updatePassword (res, email, password_crypted) {
    try {
        await sql.query`UPDATE users SET password = ${password_crypted} WHERE email = ${email}`;
        return res.json("Success");
    } catch (err) {
        return res.json(err);
    }
}

// Connect to the database
connectToDatabase();

module.exports = {
    getWorkoutByUserAndDate,
    getUserByEmail,
    signUp,
    addWorkout,
    editWorkoutById,
    deleteWorkoutById,
    updateEmail,
    updatePassword
};