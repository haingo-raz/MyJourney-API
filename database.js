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
    let sql = "INSERT INTO workout (user_email, videoUrl, title, duration) VALUES ('" + workout.user_email + "', '" + workout.videoUrl + "', '" + workout.title + "', '" + workout.duration + "')";

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json("Success");

    });
}

function deleteWorkoutById(res, id){
    let sql = "DELETE FROM workout WHERE id = " + id;

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
}

function getWorkout(res){
    let sql = "SELECT * FROM workout";

    //Execute query and output results
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
    });
}

module.exports.getWorkout = getWorkout;
module.exports.getUserByEmail = getUserByEmail;
module.exports.signUp = signUp;
module.exports.addWorkout = addWorkout;
module.exports.deleteWorkoutById = deleteWorkoutById;