const mysql = require('mysql');
require('dotenv').config();

// Configuration for the database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE
});

console.log("Starting...");

async function getUserByEmail(email, callback) {
    let sql = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        else {
            return callback(null, result[0]);
        }
    });
}

async function signUp(res, email, password_crypted) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err);
        }

        try {
            let sql = `INSERT INTO users (email, password) VALUES ('${email}', '${password_crypted}')`;
            let sql2 = `INSERT INTO profile (user_email) VALUES ('${email}')`;

            db.query(sql, (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err);
                    });
                }

                db.query(sql2, (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.json(err);
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                return res.json(err);
                            });
                        }
                        return res.json("Success");
                    });
                });
            });
        } catch (err) {
            db.rollback(() => {
                return res.json(err);
            });
        }
    });
}



async function addWorkout(res, workout) {
    try {
        let sql = `INSERT INTO workout (title, videoUrl, duration, user_email, dayCreated, status) VALUES ('${workout.title}', '${workout.videoUrl}', ${workout.duration}, '${workout.user_email}', '${workout.dayCreated}', '${workout.status}')`;
        db.query(sql, (err, result) => {
            if (err) return res.json(err);
            return res.json("Success");
        });
    } catch (err) {
        return res.json(err);
    }
}

async function editWorkoutById(res, workout) {
    try {
        let sql = `UPDATE workout SET title = '${workout.title}', videoUrl = '${workout.videoUrl}', duration = ${workout.duration} WHERE workoutId = ${workout.workoutId}`;
        db.query(sql, (err, result) => {
            if (err) return res.json(err);
            return res.json("Success");
        });
    } catch (err) {
        return res.json(err);
    }
}

async function deleteWorkoutById(res, id) {
    try {
        let sql = `DELETE FROM workout WHERE workoutId = ${id}`;
        db.query(sql, (err, result) => {
            return res.json("Success");
        });
    } catch (err) {
        return res.json(err);
    }
}

function getWorkoutByUserAndDate(res, email, date) {
    const aggregateSql = `
        SELECT 
            COUNT(*) AS workoutCount, 
            SUM(duration) AS totalDuration 
        FROM workout 
        WHERE user_email = ? 
          AND dayCreated = ?
    `;

    const detailsSql = `
        SELECT * 
        FROM workout 
        WHERE user_email = ? 
          AND dayCreated = ?
    `;

    db.query(aggregateSql, [email, date], (err, aggregateResult) => {
        console.log("Aggregate SQL query: ", aggregateSql);
        if (err) return res.json(err);

        db.query(detailsSql, [email, date], (err, detailsResult) => {
            if (err) return err.json(err);

            const response = {
                count: aggregateResult[0].workoutCount,
                totalDuration: aggregateResult[0].totalDuration,
                workouts: detailsResult
            };

            return res.json(response);
        });
    });
}

async function updateEmail(res, email, newEmail) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err);
        }

        try {
            db.query(`SET FOREIGN_KEY_CHECKS = 0`);
            db.query(`UPDATE workout SET user_email = '${newEmail}' WHERE user_email = '${email}'`);
            db.query(`UPDATE users SET email = '${newEmail}' WHERE email = '${email}'`);
            db.query(`SET FOREIGN_KEY_CHECKS = 1`);
            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err);
                    });
                }
                return res.json("Success");
            });
        } catch (err) {
            db.rollback(() => {
                return res.json(err);
            });
        }
    });
}

async function updatePassword(res, email, password_crypted) {
    try {
        let sql = `UPDATE users SET password = '${password_crypted}' WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            return res.json("Success");
        });
    } catch (err) {
        return res.json(err);
    }
}

async function deleteAccount(res, email) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err);
        }
        try {
            db.query(`SET FOREIGN_KEY_CHECKS = 0`);
            db.query(`DELETE FROM users WHERE email = '${email}'`);
            db.query(`DELETE FROM workout WHERE user_email = '${email}'`);
            db.query(`SET FOREIGN_KEY_CHECKS = 1`);
            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err);
                    });
                }
                return res.json("Success");
            });
        } catch (err) {
            db.rollback(() => {
                return res.json(err);
            });
        }
    });
}

function saveProfile(res, user_email, updateFields) {
    try {
        if (updateFields.length === 0) {
            return res.json("No fields to update");
        }
        let sql = `UPDATE profile SET ${updateFields.join(', ')} WHERE user_email = '${user_email}'`;
        console.log(sql)
        db.query(sql, (err, result) => {
            if (err) return res.json(err);
            return res.json("Success");
        });
    } catch (err) {
        return res.json(err);
    }
}

function getProfileDetails(res, user_email) {  
    let sql = `SELECT * FROM profile WHERE user_email = '${user_email}'`;
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result[0]);
    }); 
}

function getWorkoutMinutesCount(res, user_email) {
    try {
        let sql = `SELECT SUM(duration) AS totalDuration FROM workout WHERE user_email = '${user_email}'`;
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) return res.json(err);
            let response = `You have trained for a total of ${result[0].totalDuration} minutes.`;
            return res.json(response);
        });
    } catch (err) {
        return res.json(err);
    }
}

function getWorkoutProgramsCount(res, user_email) {
    try {
        let sql = `SELECT COUNT(*) AS totalWorkouts FROM workout WHERE user_email = '${user_email}'`;
        db.query(sql, (err, result) => {
            if (err) return res.json(err);
            let response = `You have completed a total of ${result[0].totalWorkouts} workout programs.`;
            return res.json(response);
        });
    } catch (err) {
        return res.json(err);
    }
}

module.exports = {
    getWorkoutByUserAndDate,
    getUserByEmail,
    signUp,
    addWorkout,
    editWorkoutById,
    deleteWorkoutById,
    updateEmail,
    updatePassword,
    deleteAccount,
    saveProfile,
    getProfileDetails,
    getWorkoutMinutesCount,
    getWorkoutProgramsCount
};