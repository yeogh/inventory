import React from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const NavBar = ({setAuth, isAuthenticated}) => {

    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("logged out successfully!")
    }


    return (
        <>
            <div className="navbar bg-base-100 bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/search")}>Inventory</a>
                </div>
                {!isAuthenticated?  "" :
                (<div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><a onClick={() => navigate("/create")}>Create Product</a></li>
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={() => navigate("/create")}>Create Product</a></li>
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
                </div>)}
            </div>
        </>
    );
};

export default NavBar;