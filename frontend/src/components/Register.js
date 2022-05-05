import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import ProductContext from "./product-context";

//Assets
import Button from './assets/Button';
import Input from './assets/Input';

const Register = () => {

    const pdtCtx = useContext(ProductContext);

    const navigate = useNavigate();

    const [registerInputs, setRegisterInputs] = useState({
        name: "",
        email: "",
        password: "",
        permission:""
    })
    const [seePwd, setSeePwd] = useState(false);

    const onClickSeePwd = () => {
        if (seePwd === true) {
            setSeePwd(false)
        } else if (seePwd === false) {
            setSeePwd(true)
        }
    };

    const {name, email, password, permission} = registerInputs;

    const onChange = (e) => {
        setRegisterInputs({...registerInputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            
            const body = {name, email, password, permission};

            const response = await fetch("http://localhost:5001/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token)

                pdtCtx.setAuth(true);

                toast.success("registered successfully!")

            } else {
                pdtCtx.setAuth(false);
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
                <div className='flex flex-row'><Input type={seePwd?"text" :"password"} name="password" value={password} onChange={onChange} htmlFor="password" label="Password"/> <span
                className="ml-2 text-primary hover:text-primary hover: cursor-pointer"
                onClick={onClickSeePwd}
                >
                {seePwd? "Hide" : "See"}
                </span></div>

                <div className="mb-6 mr-6 w-40">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Role</label>
                    <select className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1" name="permission" onChange={onChange}>
                        <option value="">Select below</option>
                        <option value="STAFF">STAFF</option>
                        <option value="SUP">SUP</option>
              </select>
            </div>
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