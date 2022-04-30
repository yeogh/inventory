import axios from "axios";

const baseURL = "http://localhost:5001";

//All products
const allProducts = async () => {
    const response = await axios.get(`${baseURL}/products/list`);
    return response.data
}

//User register
// const userRegister = async (name, password, email) => {
//     const response = await axios.post(`${baseURL}/auth/register`, {
//         name, password, email,
//     });

// }




const server = {
    allProducts
};

export default server;