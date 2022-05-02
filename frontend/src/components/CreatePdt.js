import React, { useState, useEffect } from 'react';

//Assets
import InputBox from './assets/InputBox';
// import Dropdown from './assets/Dropdown';
import Button from './assets/Button';

const CreatePdt = () => {

    // const [code, setCode] = useState("");
    // const [name, setName] = useState("");
    // const [size, setSize] = useState("");
    // const [option, setOption] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [quantityOptimal, setQuantityOptimal] = useState("");

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
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            setInputs({...inputs, created_by: userId});

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
                <div className="mb-6 mr-6 w-40">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Size</label>
                    <select className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1" name="size" onChange={onChange}>
                        <option value="">Select One</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <InputBox className="mb-6 mr-6 w-48" label="Option" type="text" name="option" value={option} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="Quantity" type="number" name="quantity" value={quantity} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="Optimal Quantity" type="number" name="quantity_optimal" value={quantity_optimal} onChange={onChange}/>
                <Button type="submit" text="Create" />
            </form>
        </div>
    );
};

export default CreatePdt;