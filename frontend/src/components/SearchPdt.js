import { useState, useEffect } from "react";
import callApi from "../callApi";


const SearchPdt = () => {
    const [productlist, setProductList] = useState([]);

    async function getProducts() {
        try {
            const response = await fetch ("http://localhost:5001/products/list", {
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json();

            console.log(parseRes)
            setProductList(parseRes)

        } catch (err) {
            console.error(err.message);
        }
    }


  useEffect(() => {
      getProducts()
    // callApi.allProducts().then((data) => {
    // setProductList(data);    
    // });
  }, []);

  const viewList = productlist.map((element, index) => {
    return (
      <div
         className="card h-100"
       key={index}>
      <div className="card-body">
           <p className="card-title">
             <strong id="cardtitle">{element.code}</strong>
             <br />
             <em id="cardauthor">{element.name}</em> <br />
             {element.size}<br />
             {element.quantity}
           </p>
         </div>
       </div>
     
    );
  })
    
    
    return (
        <>
            <h1>Products</h1>
            {viewList}        
    
        </>
    );
};

export default SearchPdt;
