const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myjourney'
})

function getUserByEmail(email, callback) {
    let sql = "SELECT * FROM users WHERE email = '" + email + "'";
    db.query(sql, (err, result) => {
        if (err) return callback(err, null);
        else {
            console.log(result[0])
            return callback(null, result[0]);
        }
    });
}

function signUp(res, email, password_crypted) {
    let sql = "INSERT INTO users (email, password) VALUES ('" + email + "', '" + password_crypted + "')";

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json("Success");
    });
}

function addWorkout(res, workout){
    let sql = "INSERT INTO workout (title, videoUrl, duration, user_email, dayCreated) VALUES ('" + workout.title + "', '" + workout.videoUrl + "', '" + workout.duration + "', '" + workout.user_email + "', '" + workout.dayCreated +"')";

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json("Success");
    });
}

function editWorkoutById(res, workout){
    let sql = "UPDATE workout SET title = '" + workout.title + "', videoUrl = '" + workout.videoUrl + "', duration = '" + workout.duration + "' WHERE workoutId = " + workout.workoutId;
    console.log("SQL to update: ", sql)

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json("Success");
    });
}

function deleteWorkoutById(res, id){
    let sql = "DELETE FROM workout WHERE workoutId = " + id;
    console.log("SQL query: ", sql);
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
}

function getWorkoutByUserAndDate(res, email, date) {
    // SQL query to get the count of workouts and the total duration
    const aggregateSql = `
        SELECT 
            COUNT(*) AS workoutCount, 
            SUM(duration) AS totalDuration 
        FROM workout 
        WHERE user_email = ? 
          AND dayCreated = ?
    `;
    
    // SQL query to get all the workout results
    const detailsSql = `
        SELECT * 
        FROM workout 
        WHERE user_email = ? 
          AND dayCreated = ?
    `;

    // Execute aggregate query
    db.query(aggregateSql, [email, date], (err, aggregateResult) => {
        if (err) return res.json(err);

        // Get the workout results
        db.query(detailsSql, [email, date], (err, detailsResult) => {
            if (err) return res.json(err);

            // Combine the results
            const response = {
                count: aggregateResult[0].workoutCount,
                totalDuration: aggregateResult[0].totalDuration,
                workouts: detailsResult
            };

            return res.json(response);
        });
    });
}


module.exports.getWorkoutByUserAndDate = getWorkoutByUserAndDate;
module.exports.getUserByEmail = getUserByEmail;
module.exports.signUp = signUp;
module.exports.addWorkout = addWorkout;
module.exports.editWorkoutById = editWorkoutById;
module.exports.deleteWorkoutById = deleteWorkoutById;