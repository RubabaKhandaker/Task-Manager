require('dotenv').config();

const { buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const myTaskApp = express();
myTaskApp.use(cors());

// user storage in memory
const appUsers = [];

// jwt secret key
const secretKey = process.env.JWT_SECRET || 'default_secret';

// graphql schemas
const schema = buildSchema(`

  type Task {

    id: ID!
    title: String!
    description: String!

  }

  type User {

    id: ID!
    username: String!
    email: String!

  }

  type AuthData {

    token: String!
    user: User!

  }

  type Query {

    tasks: [Task]
    users: [User]

  }

  type Mutation {

    createTask(title: String!, description: String!): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Boolean
    signUp(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthData

  }

`);

// task storage in memory
let appTasks = [];

// graphql resolvers
const root = {

  tasks: () => appTasks,
  users: () => appUsers,
  createTask: ({ title, description }) => {

    const newTask = { id: appTasks.length + 1, title, description };
    appTasks.push(newTask);
    return newTask;

  },
  updateTask: ({ id, title, description }) => {

    const indexTask = appTasks.findIndex((task) => task.id === parseInt(id));

    if (indexTask !== -1) {

      appTasks[indexTask] = { ...appTasks[indexTask], title, description };
      return appTasks[indexTask];

    }

    return null;

  },

  deleteTask: ({ id }) => {

    appTasks = appTasks.filter((task) => task.id !== parseInt(id));
    return true;

  },

  signUp: async ({ username, email, password }) => {

    // to check if email is registered
    if (appUsers.some(user => user.email === email)) {

      throw new Error('This email is already in use!');

    }

    // hashed password
    const hashedPass = await bcrypt.hash(password, 10);

    // new user creation
    const userNew = { id: appUsers.length + 1, username, email, password: hashedPass };

    // storing user in memory
    appUsers.push(userNew);

    return userNew;
  },

  login: async ({ email, password }) => {

    // Finding the user by email
    const user = appUsers.find(u => u.email === email);

    if (!user) {

      throw new Error('The given credentials are invalid!');

    }

    // For checking if the password provided matches stored hashed pass
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {

      throw new Error('The given password is invalid!');

    }

    // jwt token creation
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    return { token, user };
  },
};

myTaskApp.use("/graphql", graphqlHTTP({ 
  schema, 
  rootValue: root, 
  graphiql: true 
}));

const port = 3001;
myTaskApp.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}/graphql`);
});