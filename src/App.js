import React, { useState, useContext, createContext } from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from './services';
import "./App.css";

const authService = new AuthService()

export const UserContext = createContext()

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    someFunction: () => {
      // we can pass a function here 
    }
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

function PrivateRoute({ children }) {
  const context = useContext(UserContext)
  const { isLoggedIn } = context.authService

  if (!isLoggedIn) {
    return <Navigate to="/about" replace />
  }

  return children
}

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>      
    </div>
  );
}

function Home() {
  const [userLogin, setUserLogin] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const onChange = ({target: {value}}) => {
    setUserLogin(value)
  }

  const onSubmit = (e) => {
    e.preventDefault() 
    if (!!userLogin) {
      const { from } = location.state || { from: { pathname: '/private' }}
      authService.loginUser(userLogin)
      navigate(from, { replace: true })
    }
  }

  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
        <br />
        <Link to="/private">Private</Link>
        <br />
        <br />
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" placeholder='type "true" and login' />
          <button type="submit">Login</button>
        </form>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
        <h3>Tried to login without typing "true"</h3>
        <p>
          Go back and try again!
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function Private() {
  const location = useLocation()
  const navigate = useNavigate()
    
  const onLogout = (e) => {
    e.preventDefault() 
    const { from } = location.state || { from: { pathname: '/' }}
    authService.logoutUser()
    navigate(from, { replace: true })
  }

  return (
    <>
      <main>
        <h2>This is the Private page!</h2>
        <h2>We are here to love!</h2>
        <p>
          If nothing else, we have love.
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/about">About</Link>
      </nav>
      <br />
      <button onClick={onLogout} type="submit">Logout</button>
    </>
  );
}
