const { buildSchema } = require('graphql');
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// mongodb set-up -- need help with kunal 
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {

  console.log('MongoDB database connection established successfully');

});

// user model
const Schema = mongoose.Schema;
const userSchema = new Schema({

  username: String,
  email: String,
  password: String,

});
const User = mongoose.model('User', userSchema);

// graphql schemas
const AuthDataType = new buildSchema(`

  type AuthData {

    userId: ID!
    token: String!
    tokenExpiration: Int!

  }
`);

const RootQueryType = new buildSchema(`

  type RootQuery {

    tasks: [Task]

  }

`);

const MutationType = new buildSchema(`

  type Mutation {

    signUp(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthData
    createTask(title: String!, description: String!): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Boolean

  }

`);

const appUser = new buildSchema(`

  ${AuthDataType}
  ${RootQueryType}
  ${MutationType}

`);

// express app set-up
const app = express();
app.use(cors());

const root = {

  tasks: () => tasks,
  createTask: ({ title, description }) => {

    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    return newTask;

  },
  updateTask: ({ id, title, description }) => {

    const indexTask = tasks.findIndex((task) => task.id === parseInt(id));

    if (indexTask !== -1) {

      tasks[indexTask] = { ...tasks[indexTask], title, description };
      return tasks[indexTask];

    }
    return null;

  },

  deleteTask: ({ id }) => {

    tasks = tasks.filter((task) => task.id !== parseInt(id));
    return true;

  },

  signUp: async ({ username, email, password }) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;

  },

  login: async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {

      throw new Error('User not found');

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

      throw new Error('Invalid password');

    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'secret-key', {

      expiresIn: '1h',

    });

    return { userId: user.id, token, tokenExpiration: 3600 };
  },

};

app.use('/graphql', graphqlHTTP({
  schema: appUser,
  rootValue: root,
  graphiql: true,
}));

const port = 3001;
app.listen(port, () => {

    console.log(`This server is running on http://localhost:${port}/graphql`);

});