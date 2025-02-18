import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

// Configuration for the database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
})

console.log('Starting...')

async function getUserByEmail(email, callback) {
    let sql = `SELECT * FROM user WHERE email = ?`
    db.query(sql, [email], (err, result) => {
        if (err) return callback(err)
        return callback(null, result[0])
    })
}

async function signUp(res, email, password_crypted) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err)
        }

        try {
            let sql = `INSERT INTO user (email, password) VALUES (?, ?)`
            let sql2 = `INSERT INTO profile (user_email) VALUES (?)`

            db.query(sql, [email, password_crypted], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err)
                    })
                }

                db.query(sql2, [email], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.json(err)
                        })
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                return res.json(err)
                            })
                        }
                        return res.json('Success')
                    })
                })
            })
        } catch (err) {
            db.rollback(() => {
                return res.json(err)
            })
        }
    })
}

async function addWorkout(res, workout) {
    try {
        let sql = `INSERT INTO workout (title, video_url, duration, user_email, day_created, status) VALUES (?, ?, ?, ?, ?, ?)`
        db.query(
            sql,
            [
                workout.title,
                workout.video_url,
                workout.duration,
                workout.user_email,
                workout.day_created,
                workout.status,
            ],
            (err, result) => {
                if (err) return res.json(err)
                return res.json('Success')
            }
        )
    } catch (err) {
        return res.json(err)
    }
}

async function editWorkoutById(res, workout) {
    try {
        let sql = `UPDATE workout SET title = ?, video_url = ?, duration = ? WHERE workout_id = ?`
        db.query(
            sql,
            [
                workout.title,
                workout.video_url,
                workout.duration,
                workout.workout_id,
            ],
            (err, result) => {
                if (err) return res.json(err)
                return res.json('Success')
            }
        )
    } catch (err) {
        return res.json(err)
    }
}

function editWorkoutStatusById(res, status, workoutId) {
    try {
        let sql = `UPDATE workout SET status = ? WHERE workout_id = ?`
        db.query(sql, [status, workoutId], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function deleteWorkoutById(res, id) {
    try {
        let sql = `DELETE FROM workout WHERE workout_id = ?`
        db.query(sql, [id], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutByUserAndDate(res, email, date) {
    const aggregateSql = `
        SELECT 
            COUNT(*) AS workoutCount, 
            SUM(duration) AS totalDuration 
        FROM workout 
        WHERE user_email = ? 
          AND day_created = ?
    `

    const detailsSql = `
        SELECT * 
        FROM workout 
        WHERE user_email = ? 
          AND day_created = ?
    `

    db.query(aggregateSql, [email, date], (err, aggregateResult) => {
        if (err) return res.json(err)

        db.query(detailsSql, [email, date], (err, detailsResult) => {
            if (err) return res.json(err)

            const response = {
                count: aggregateResult[0].workoutCount,
                totalDuration: aggregateResult[0].totalDuration,
                workouts: detailsResult,
            }

            return res.json(response)
        })
    })
}

async function updateEmail(res, email, newEmail) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err)
        }

        try {
            db.query(`SET FOREIGN_KEY_CHECKS = 0`)
            db.query(`UPDATE workout SET user_email = ? WHERE user_email = ?`, [
                newEmail,
                email,
            ])
            db.query(`UPDATE profile SET user_email = ? WHERE user_email = ?`, [
                newEmail,
                email,
            ])
            db.query(`UPDATE user SET email = ? WHERE email = ?`, [
                newEmail,
                email,
            ])
            db.query(`SET FOREIGN_KEY_CHECKS = 1`)
            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err)
                    })
                }
                return res.json('Success')
            })
        } catch (err) {
            db.rollback(() => {
                return res.json(err)
            })
        }
    })
}

async function updatePassword(res, email, password_crypted) {
    try {
        let sql = `UPDATE user SET password = ? WHERE email = ?`
        db.query(sql, [password_crypted, email], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function deleteAccount(res, email) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err)
        }
        try {
            db.query(`SET FOREIGN_KEY_CHECKS = 0`)
            db.query(`DELETE FROM user WHERE email = ?`, [email])
            db.query(`DELETE FROM workout WHERE user_email = ?`, [email])
            db.query(`DELETE FROM profile WHERE user_email = ?`, [email])
            db.query(`SET FOREIGN_KEY_CHECKS = 1`)
            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err)
                    })
                }
                return res.json('Success')
            })
        } catch (err) {
            db.rollback(() => {
                return res.json(err)
            })
        }
    })
}

async function saveProfile(res, user_email, updateFields) {
    try {
        if (updateFields.length === 0) {
            return res.json('No fields to update')
        }
        let sql = `UPDATE profile SET ${updateFields.join(', ')} WHERE user_email = ?`
        db.query(sql, [user_email], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getProfileDetails(res, user_email) {
    let sql = `SELECT * FROM profile WHERE user_email = ?`
    db.query(sql, [user_email], (err, result) => {
        if (err) return res.json(err)
        return res.json(result[0])
    })
}

async function getWorkoutMinutesCount(res, user_email) {
    try {
        let sql = `SELECT SUM(duration) AS totalDuration FROM workout WHERE user_email = ? AND status = 1`
        db.query(sql, [user_email], (err, result) => {
            if (err) return res.json(err)
            let response = `You have trained for a total of ${result[0].totalDuration} minutes.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutProgramsCount(res, user_email) {
    try {
        let sql = `SELECT COUNT(*) AS totalWorkouts FROM workout WHERE user_email = ? AND status = 1`
        db.query(sql, [user_email], (err, result) => {
            if (err) return res.json(err)
            let response = `You have completed a total of ${result[0].totalWorkouts} workout programs.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutDaysCount(res, user_email) {
    try {
        let sql = `SELECT COUNT(DISTINCT day_created) AS totalDays FROM workout WHERE user_email = ? AND status = 1`
        db.query(sql, [user_email], (err, result) => {
            if (err) return res.json(err)
            let response = `You have trained for a total of ${result[0].totalDays} days.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

export {
    getUserByEmail,
    signUp,
    addWorkout,
    editWorkoutById,
    editWorkoutStatusById,
    deleteWorkoutById,
    getWorkoutByUserAndDate,
    updateEmail,
    updatePassword,
    deleteAccount,
    saveProfile,
    getProfileDetails,
    getWorkoutMinutesCount,
    getWorkoutProgramsCount,
    getWorkoutDaysCount,
}
