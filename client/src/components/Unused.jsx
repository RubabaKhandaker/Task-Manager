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

/*const [user, setUser] = useState(null);
    const history = useHistory();*/


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

                 /*: (

                  <div>
                    <h2>Please sign up or log in.</h2>
                
                  </div>

                 )}

                </Route>

             </Switch>

          </div>

        </Router>
    ); */