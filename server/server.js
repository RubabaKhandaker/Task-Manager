const { buildSchema } = require("graphql");
const cors = require("cors");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
 
let tasks = [];
 
const schema = buildSchema(`

  type Task {

    id: ID!
    title: String!
    description: String!

  }
 

  type Query {

    tasks: [Task]

  }
 

  type Mutation {

    createTask(title: String!, description: String!): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Boolean

  }
`);
 
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

};
 
const app = express();
app.use(cors());
 

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
 
const port = 3001;
app.listen(port, () => {

    console.log(`This server is running on http://localhost:${port}/graphql`);
});