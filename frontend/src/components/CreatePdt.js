import React, { useState, useEffect, useContext } from 'react';
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom"
import ProductContext from "./product-context";

//Assets
import InputBox from './assets/InputBox';
import Dropdown from './assets/Dropdown';
import Button from './assets/Button';

const CreatePdt = () => {

    const pdtCtx = useContext(ProductContext);

    const navigate = useNavigate();
    
    const [userId, setUserId] = useState("");
    
    const [createInputs, setCreateInputs] = useState({
        code: "",
        name: "",
        size: "",
        option: "", 
        quantity: "", 
        quantity_optimal: "",
        created_by: userId
    })

    const {code, name, size, option, quantity, quantity_optimal, created_by} = createInputs;

    async function getUserId () {
        try {
            const response = await fetch("http://localhost:5001/products/userid", {
                method: "GET",
                headers: {token: localStorage.token}
        })
        const parseRes = await response.json();

        setUserId(parseRes.user_id);
        
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    const onChange = (e) => {
        setCreateInputs({...createInputs, [e.target.name] : e.target.value});

    }
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            const body = {code: code.toUpperCase(), name, size, option, quantity, quantity_optimal, created_by: userId};

            const response = await fetch("http://localhost:5001/products/create", {
                method: "POST",
                headers: {token: localStorage.token,
                "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            toast.success(parseRes)

            setCreateInputs({
            code: "",
            name: "",
            size: null,
            option: "", 
            quantity: "", 
            quantity_optimal: "",
            created_by: userId});

            // console.log(body);  
            // console.log(userId)
            // console.log(body); 
            // console.log(parseRes)      
            
            navigate(`/search`)

            const responseList = await fetch (`http://localhost:5001/products/search/${code.toUpperCase()}/${size}`, {
            method: "GET",
            headers: {token: localStorage.token},
             });

            const parseResList = await responseList.json();

            console.log(parseResList)
            pdtCtx.setProductList(parseResList)

        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <>
            <div className="flex-col items-center justify-center mt-6">
            <h1 className="text-center">Create Product</h1>
            <form onSubmit={onSubmitForm}>
                <div className="flex flex-row justify-center mt-6">
                    <InputBox className="mb-6 mr-6 w-48" label="Code" type="text" name="code" value={code} onChange={onChange}/>
                    <InputBox className="mb-6 mr-6 w-48" label="Name" type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="flex flex-row justify-center">
                    <Dropdown className="mb-6 mr-6 w-48" label="Size" name="size" onChange={onChange} value={size} firstOptionLabel="Select One"/>
                    <InputBox className="mb-6 mr-6 w-48" label="Option" type="text" name="option" value={option} onChange={onChange}/>
                </div>
                <div className="flex flex-row justify-center">
                    <InputBox className="mb-6 mr-6 w-48" label="Quantity" type="number" name="quantity" value={quantity} onChange={onChange}/>
                    <InputBox className="mb-6 mr-6 w-48" label="Optimal Quantity" type="number" name="quantity_optimal" value={quantity_optimal} onChange={onChange}/>
                </div>
                <div className="flex justify-center" >
                    <Button type="submit" text="Create" />
                </div>
            </form>
        </div>
    </>
    );
};

export default CreatePdt;