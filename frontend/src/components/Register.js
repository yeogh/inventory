import React, {useState} from 'react';

const Register = ({setAuth}) => {

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

            localStorage.setItem("token", parseRes.token)

            setAuth(true);

        } catch (err) {
            console.error(err.message)
            
        }
    }

    return (
        <>
            <h1 className='text-center m-10 text-xl'>Register</h1>
            <form className="flex flex-col items-center justify-center" onSubmit={onSubmitForm}>
                <div className="relative z-0 w-96 mb-6 group">
                    <input type="text" name="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={name} onChange={e => onChange(e)} />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name</label>
                </div>
                <div className="relative z-0 w-96 mb-6 group">
                    <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={email} onChange={e => onChange(e)}/>
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-96 mb-6 group">
                    <input type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={password} onChange={e => onChange(e)} />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case">Submit</button>
            </form>     
        </>
    );
};

export default Register;