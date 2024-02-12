import React, { useState } from "react";
import {

    useQuery,
    useMutation,
    gql,
    ApolloProvider,
    ApolloClient,
    InMemoryCache,

} from "@apollo/client";

/* import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link, 
    useHistory,

} from 'react-router-dom';

import SignUp from './pages/signUp';
import Login from './pages/logIn';
import Logout from './components/logOut'; */

import "./App.css";
 
const GET_TASKS = gql`

    query {

        tasks {

            id
            title
            description

        }

    }
`;
 
const CREATE_TASK = gql`

    mutation CreateTask($title: String!, $description: String!) {

        createTask(title: $title, description: $description) {

            id
            title
            description

        }

    }
`;
 
const DELETE_TASK = gql`

    mutation DeleteTask($id: ID!) {

        deleteTask(id: $id)

    }
`;
 
const UPDATE_TASK = gql`

    mutation UpdateTask($id: ID!, $title: String, $description: String) {

        updateTask(id: $id, title: $title, description: $description) {

            id
            title
            description

        }

    }
`;
 

function App() {

    /*const [user, setUser] = useState(null);
    const history = useHistory();*/

    const { loading, error, data } = useQuery(GET_TASKS);
    const [TaskCreate] = useMutation(CREATE_TASK);
    const [TaskDelete] = useMutation(DELETE_TASK);
    const [TaskUpdate] = useMutation(UPDATE_TASK);
 
    const [taskNew, setTaskNew] = useState({ title: "", description: "" });
 
    if (loading) return <p>It's loading, this may take a second...</p>;
    if (error) return <p>Uh-Oh, error: {error.message}</p>;
 

    const handleTaskCreate = () => {

        TaskCreate({

            variables: taskNew,
            refetchQueries: [{ query: GET_TASKS }],

        });

        setTaskNew({ title: "", description: "" });

    };
 

    const handleTaskDelete = (id) => {

        TaskDelete({

            variables: { id },
            refetchQueries: [{ query: GET_TASKS }],

        });

    };
 

    const handleTaskUpdate = (id, title, description) => {

        TaskUpdate({

            variables: { id, title, description },
            refetchQueries: [{ query: GET_TASKS }],

        });

    };
    
    /* const handleSignUpSuccess = () => {

        // Redirect to the main page after successful sign-up
        history.push('/');

    };
    
    const handleLoginSuccess = (userData) => {

        setUser(userData.user);
    
        // Redirect to the main page after successful login
        history.push('/');

    };
    
    const handleLogout = () => {

        setUser(null);
    
        // Redirect to the sign-up page after logout
        history.push('./pages/signUp');

    }; */
 

    return (

       /* <Router>

          <div>
            
             <nav>

                <ul>

                  <li>

                      <Link to="/">Home!</Link>

                 </li>

                  {!user && (

                    <>
                      <li>

                          <Link to="/pages/signUp">Sign Up!</Link>

                      </li>
                      <li>

                          <Link to="/pages/logIn">Login!</Link>

                      </li>
                   </>

                  )}

                  {user && (

                   <li>

                     <Logout onLogout={() => setUser(null)} />

                   </li>

                  )}

               </ul>

             </nav>
      
             <Switch>

                 <Route path="/signup">

                      <SignUp />

                 </Route>

                 <Route path="/login">

                     <Login onLoginSuccess={(userData) => setUser(userData.user)} />

                 </Route>

                 <Route path="/">

                 {user ? ( */

                 /*{user.username} within upcoming h3 element*/

                  <div>

                    <h1>Task about it!</h1>

                    <h3>Welcome to your one-stop shop for task management.</h3>

                 <div>

                      <h2>Create Your Tasks</h2>

                      <input

                        type="text"
                        placeholder="Give your task a name!"
                        value={taskNew.title}
                        onChange={

                          (e) => setTaskNew({ ...taskNew, title: e.target.value })

                        }

                      />

                      <input

                        type="text"
                        placeholder="Describe your task!"
                        value={taskNew.description}
                        onChange={
                            
                          (e) => setTaskNew({ ...taskNew, description: e.target.value })

                        }

                      />
                      
                      <button onClick={handleTaskCreate}>Create!</button>

                  </div>

                    <div>

                      <h2>Your Tasks</h2>

                      <ul>

                        {data.tasks.map((task) => (

                          <li key={task.id}>

                            {task.title} - {task.description}

                            <button onClick={() => handleTaskDelete(task.id)}>Delete!</button>

                            <button

                              onClick={() => {

                                const updatedTitle = prompt(

                                  "Enter your new task title:",
                                  task.title

                                );
                                const updatedDescription = prompt(

                                  "Enter your new task description:",
                                  task.description

                                );
                                handleTaskUpdate(

                                  task.id,
                                  updatedTitle,
                                  updatedDescription

                                );

                              }}

                            >Update!</button>

                          </li>

                        ))}

                      </ul>

                    </div>

                   </div>

                 ) /*: (

                  <div>
                    <h2>Please sign up or log in.</h2>
                
                  </div>

                 )}

                </Route>

             </Switch>

          </div>

        </Router>
    ); */
}
      
 

const client = new ApolloClient({

    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),

});
 

function taskApp() {

    return (

        <ApolloProvider client={client}>

            <App />

        </ApolloProvider>

    );
}

export default taskApp;