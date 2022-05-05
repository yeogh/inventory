import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import ProductContext from "./product-context";

//Assets
import Button from './assets/Button';
import Input from './assets/Input';

const Login = () => {

    const pdtCtx = useContext(ProductContext);
    
    const navigate = useNavigate();

    const [loginInputs, setLoginInputs] = useState({
        email:"",
        password:""
    });
    
    const {email, password} = loginInputs;

    const onChange = (e) => {
        setLoginInputs({...loginInputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            const body = {email, password}

            const response = await fetch("http://localhost:5001/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                pdtCtx.setAuth(true);

                toast.success("login successfully!")

                console.log(parseRes);

            } else {
                pdtCtx.setAuth(false);
                toast.error(parseRes);
            }

            console.log(parseRes);
            
        } catch (err) {
            console.error(err.message)
        }

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className='text-center m-10 text-xl'>Login</h1>
                <form onSubmit={onSubmitForm}>
                <Input type="email" name="email" value={email} onChange={onChange} htmlFor="email" label="Email"/>
                <Input type="password" name="password" value={password} onChange={onChange} htmlFor="password" label="Password"/>
                <Button type="submit" text="Submit"/>
                </form>
                <p className="p-5 text-sm">
                No account?
                    <span
                    className="ml-2 text-primary hover:text-primary hover: cursor-pointer"
                    onClick={() => navigate("/register")}
                    >
                    Create one
                    </span>
                </p>
            </div>
        </>
    );
};

export default Login;