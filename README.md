# 🗞 Northcoders News API

A RESTful API for a reddit clone that allows users to interact with _articles_ by posting, voting, commenting, and deleting. Built with **express** and **knex** atop a **PostgreSQL** database. The project has also been "dockerised" - checkout the branch _dockerise_.

A hosted version can be found on Heroku [here](https://toms-nc-news-be.herokuapp.com/).

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### 🧰 Prerequisites

Before we begin, you'll need to make sure you have the following installed on your machine

- [The Git CLI](https://git-scm.com/downloads)
- [Node Package Manager](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/)

And if you plan on using the dockerised version of this app, you'll need

- [Docker](https://docs.docker.com/get-docker/)

### 🏗 Installing

1. To get started, (fork and) clone this repo.

   ```
   git clone https://github.com/tomosim/be-nc-news
   ```

2. `cd` into the directory and install the dependencies

   ```
   cd be-nc-news
   npm install
   ```

3. To get the app running on your machine, you'll first probably want to set up and seed the dev and test databases. Lucky for you, there's a script for that!

   ```
   npm run setup-dbs && npm run seed
   ```

4. Now, start the express server and the app will start listening on port 9090 of your localhost.
   ```
   npm start
   ```
5. Head over to the browser of your choice and enter `localhost:9090/api` into the address bar to see a list of all the endpoints, how to interact with them, and example responses.

6. Enjoy!

### 🐳 Docker

1. If using the dockerised verion, complete steps 1 and 2 from above.

2. Switch to the **dockerise** branch

   ```
   git checkout dockerise
   ```

3. A docker-compose.yaml file has been created to make this process as painless as possible. Run the following command to get the project up and running in a container

   ```
   docker-compose up --build
   ```

4. The container contains the express app and the PostgreSQL database running on a network. The app is exposed to the outside world on port 9090. Navigate to `localhost:9090/api` in your browser to see a list of all the endpoints, how to interact with them, and example responses.

## ✅ Running the tests

The app has been fully tested using, supertest, mocha, and chai. To run the tests, simply use the command

```
npm test
```

## 🧱Built With

- [Express](http://expressjs.com/)
- [Knex](https://knexjs.org/)
- [Node Postgres](https://node-postgres.com/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Chai](chaijs.com)
- [Mocha](mochajs.org/)
- [Nodemon](nodemon.io)

## 📇 Authors

- **Tom Simmons** - [tomosim](https://github.com/tomosim)

## 🔐 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🏅 Acknowledgments

- [Northcoders](https://northcoders.com/)
- [Heroku](https://www.heroku.com/)
