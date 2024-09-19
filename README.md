# About 
Node.js API for the [MyJourney](https://github.com/haingo-raz/MyJourney) web application.

# Functionalities
- Sign up a user
- Log in a user
- Update a user's email
- Update a user's password
- Create a workout instance
- Get a list of workouts by user email and date
- Edit a workout instance by ID
- Delete a workout instance by ID

# Technology
- Node.js/Express
- MySQL
- Azure SQL

# Architecture
In progress

# How to run it on your computer
1. Clone the project using the command `git clone https://github.com/haingo-raz/MyJourney-API.git`.
2. Run `npm install`.

## MySQL database
1. Set up the environment variables by creating a .env file. Follow the template of the example.env file. `DB_HOST` is the hostname, usually localhost. `DB_MYSQL_USER` and `DB_MYSQL_PASSWORD` are the username and password used to authenticate the connection to the MySQL database. `DB_MYSQL_DATABASE` is the name of the database with the MySQL server.
2. Run `npm start` to execute the script `nodemon index.js`.
3. Access `localhost:8080` in your browser.

## Azure SQL database
1. Rename `azuredatabase.js` to `database.js` and the current `database.js` file to another name such as `mysqldatabase.js`. Set up the environment variables by creating a .env file. Follow the template of the example.env file. `DB_USER` and `DB_PASSWORD` are the credentials of the user that has access to the Azure database. `DB_SERVER` is the name of the Azure server, and `DB_NAME` is the name of the Azure database that runs with the server.
2. Run `npm start` to execute the script `nodemon index.js`.
3. Access `localhost:8080` in your browser.