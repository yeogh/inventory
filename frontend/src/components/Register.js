import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

//Assets
import Button from './assets/Button';
import Input from './assets/Input';

const Register = ({setAuth}) => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const {name, email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            
            const body = {name, email, password};

            const response = await fetch("http://localhost:5001/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token)

                setAuth(true);

                toast.success("registered successfully!")

            } else {
                setAuth(false);
                toast.error(parseRes);
            }

            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <h1 className='text-center m-10 text-xl'>Register</h1>
            <form onSubmit={onSubmitForm}>
                <Input type="text" name="name" value={name} onChange={onChange} htmlFor="name" label="Username"/>
                <Input type="email" name="email" value={email} onChange={onChange} htmlFor="email" label="Email"/>
                <Input type="password" name="password" value={password} onChange={onChange} htmlFor="password" label="Password"/>
                <Button type="submit" text="Submit" />
            </form>  
            <p className="p-5 text-sm">
            Have an account?
                <span
                className="ml-2 text-primary hover:text-primary hover: cursor-pointer"
                onClick={() => navigate("/login")}
                >
                Log in
                </span>
            </p>
            </div>   
        </>
    );
};

export default Register;