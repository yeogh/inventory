import React, {useState, useEffect} from "react";
import callApi from "./callApi";
import { Route, Routes,  Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

//components
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPdt from "./components/SearchPdt";
import NavBar from "./components/NavBar";

toast.configure();

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {

    try {
      const response = await fetch ("http://localhost:5001/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
    })

    const parseRes = await response.json();

    console.log(parseRes)

    parseRes === true? setIsAuthenticated(true) : setIsAuthenticated(false);
    
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <>
    <div className="container">
      <main>
        <NavBar setAuth={setAuth} isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login"/>}/>
          <Route path="/login" element={ !isAuthenticated? <Login setAuth={setAuth} />: <Navigate replace to="/search" />}/>
          <Route path="/register" element={ !isAuthenticated? <Register setAuth={setAuth} /> : <Navigate replace to="/login" />}/>
          <Route path="/search" element={ isAuthenticated? <SearchPdt setAuth={setAuth} /> : <Navigate replace to='/login'/>}/>
        </Routes>
      </main>
    </div>    
    </>
  );
}

export default App;
