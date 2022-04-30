import { useState, useEffect } from "react";
import callApi from "../callApi";


const SearchPdt = () => {
    const [productlist, setProductList] = useState([]);

  useEffect(() => {
    callApi.allProducts().then((data) => {
    setProductList(data);    
    });
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
        <div>
            <h1>Products</h1>
            {viewList}        
        </div>
    );
};

export default SearchPdt;
