# About

Node.js API for the [MyJourney](https://github.com/haingo-raz/MyJourney) web application.
MyJourney is a web application where users can create, save, and edit their workout journey. Furthermore, they have the option to chat with an AI or ask questions about their journey.

# Functionalities

-   Sign up a user
-   Log in a user
-   Delete an account
-   Update a user's email
-   Update a user's password
-   Create a workout instance
-   Get a list of workouts by user email and date
-   Edit a workout instance by ID
-   Delete a workout instance by ID
-   Respond to predefined questions
-   Chat with an AI

# Technology

-   Node.js/Express
-   MySQL (option 1)
-   Azure SQL (option 2)
-   GEMINI API (Get your own API key [here](https://ai.google.dev/gemini-api/docs/api-key). Then add it to your .env file.)

# How to run it on your computer

1. Clone the project using the command `git clone https://github.com/haingo-raz/MyJourney-API.git`.
2. Run `npm install` to install packages and dependencies.

## MySQL database

1. Set up the environment variables by creating a .env file. Follow the template of the example.env file. `DB_HOST` is the hostname, usually localhost. `DB_MYSQL_USER` and `DB_MYSQL_PASSWORD` are the username and password used to authenticate the connection to the MySQL database. `DB_MYSQL_DATABASE` is the name of the database with the MySQL server. A dummy SQL database is made available in the [database dump](/database_dump) folder.
2. Run `npm start` to execute the script `nodemon index.js`.
3. Access `localhost:8080` in your browser.

## Azure SQL database

1. Rename `azuredatabase.js` to `database.js` and the current `database.js` file to another name such as `mysqldatabase.js`. Set up the environment variables by creating a .env file. Follow the template of the example.env file. `DB_USER` and `DB_PASSWORD` are the credentials of the user that has access to the Azure database. `DB_SERVER` is the name of the Azure server, and `DB_NAME` is the name of the Azure database that runs with the server.
2. Run `npm start` to execute the script `nodemon index.js`.
3. Access `localhost:8080` in your browser.

## Test

After ensuring that all dependencies are installed, run `npm run test` in the terminal.

### Running Unit Tests

1. Ensure that your MySQL or Azure SQL database is set up and running.
2. Populate the database with test data if necessary.
3. Run `npm run test` to execute the unit tests. This command will run all test files located in the `tests` directory.
