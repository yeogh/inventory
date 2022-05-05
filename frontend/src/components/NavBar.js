import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import ProductContext from "./product-context";

const NavBar = () => {

    const pdtCtx = useContext(ProductContext);

    const navigate = useNavigate();

    const onClickSiteName = (e) => {
        e.preventDefault();
        navigate("/search");
        pdtCtx.setProductList([]);
        pdtCtx.setSearchInputs({
            code:"",
            size:"%25"
          });
    }

    const onClickCreateProduct = (e) => {
        e.preventDefault();
        navigate("/create");
        pdtCtx.setProductList([]);
        pdtCtx.setSearchInputs({
            code:"",
            size:"%25"
          });
    }

    const onClickReport = (e) => {
        e.preventDefault();
        navigate("/report");
        pdtCtx.setProductList([]);
        pdtCtx.setSearchInputs({
            code:"",
            size:"%25"
          });
    }

    const onClickLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        pdtCtx.setAuth(false);
        toast.success("logged out successfully!")
        pdtCtx.setProductList([]);
        pdtCtx.setSearchInputs({
            code:"",
            size:"%25"
          });
    }


    return (
        <>
            <div className="navbar bg-base-100 bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl" onClick={onClickSiteName}>Inventory</a>
                </div>
                {!pdtCtx.isAuthenticated?  "" :
                (<div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {pdtCtx.userPermission? <li><a onClick={onClickCreateProduct}>Create Product</a></li> : ""}
                        <li><a onClick={onClickReport}>Report</a></li>
                        <li><a onClick={onClickLogout}>Logout</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {pdtCtx.userPermission? <li><a onClick={onClickCreateProduct}>Create Product</a></li> : ""}
                        <li><a onClick={onClickReport}>Report</a></li>
                        <li><a onClick={onClickLogout}>Logout</a></li>
                    </ul>
                </div>
                </div>)}
            </div>
        </>
    );
};

export default NavBar;