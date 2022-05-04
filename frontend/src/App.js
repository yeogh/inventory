import React, {useState, useEffect} from "react";
import { Route, Routes,  Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProductContext from "./components/product-context";

//Components
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPdt from "./components/SearchPdt";
import NavBar from "./components/NavBar";
import CreatePdt from "./components/CreatePdt";
import ResultList from "./components/ResultList";
import Report from "./components/Report";

toast.configure();

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const [searchInputs, setSearchInputs] = useState({
    code:"",
    size:"%25"
  });    

  const [productlist, setProductList] = useState([]);
  
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
    <ProductContext.Provider value={{isAuthenticated, setAuth, searchInputs, setSearchInputs, productlist, setProductList
    }}>
    <div className="container">
      <main>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login"/>}/>
          <Route path="/login" element={ !isAuthenticated? <Login />: <Navigate replace to="/search" />}/>
          <Route path="/register" element={ !isAuthenticated? <Register/> : <Navigate replace to="/login" />}/>
          <Route path="/search" element={ isAuthenticated? (<><SearchPdt/> <ResultList/></>) : (<Navigate replace to='/login'/>)}/>
          <Route path="/create" element={ isAuthenticated? <CreatePdt/> : <Navigate replace to='/login'/>}/>
          <Route path="/report" element={ isAuthenticated? <Report/> : <Navigate replace to='/login'/>}/>
        </Routes>
      </main>
    </div>
    </ProductContext.Provider>    
    </>
  );
}

export default App;
