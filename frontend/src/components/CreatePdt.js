import React, { useState, useEffect } from 'react';

//Assets
import InputBox from './assets/InputBox';
import Dropdown from './assets/Dropdown';
import Button from './assets/Button';

const CreatePdt = () => {

    const [userId, setUserId] = useState("");
    
    const [inputs, setInputs] = useState({
        code: "",
        name: "",
        size: "",
        option: "", 
        quantity: "", 
        quantity_optimal: "",
        created_by: userId
    })

    const {code, name, size, option, quantity, quantity_optimal, created_by} = inputs;

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
        setInputs({...inputs, [e.target.name] : e.target.value})
    }
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            // setInputs({...inputs, created_by: userId});

            const body = {code, name, size, option, quantity, quantity_optimal, created_by};

            const response = await fetch("http://localhost:5001/products/create", {
                method: "POST",
                headers: {token: localStorage.token,
                "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            // console.log(body);  
            console.log(userId)
            console.log(body); 
            console.log(parseRes)      

        } catch (err) {
            console.error(err.message)
        }

    }


    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={onSubmitForm}>
                <InputBox className="mb-6 mr-6 w-48" label="Code" type="text" name="code" value={code} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="Name" type="text" name="name" value={name} onChange={onChange}/>
                <Dropdown className="mb-6 mr-6 w-40" label="Size" name="size" onChange={onChange} value="" firstOptionLabel="Select One"/>
                <InputBox className="mb-6 mr-6 w-48" label="Option" type="text" name="option" value={option} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="Quantity" type="number" name="quantity" value={quantity} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="Optimal Quantity" type="number" name="quantity_optimal" value={quantity_optimal} onChange={onChange}/>
                <Button type="submit" text="Create" />
            </form>
        </div>
    );
};

export default CreatePdt;