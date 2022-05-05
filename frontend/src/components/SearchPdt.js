import { useEffect, useContext } from "react";
import ProductContext from "./product-context";

//Assets
import Button from "./assets/Button";
import InputBox from "./assets/InputBox";
import Dropdown from "./assets/Dropdown";

const SearchPdt = () => {

  const pdtCtx = useContext(ProductContext);

  const {code, size} = pdtCtx.searchInputs;

  //Get user permission
  async function getUserPermission () {
    try {
        const responseUser = await fetch("http://localhost:5001/products/userid", {
            method: "GET",
            headers: {token: localStorage.token}
    })
    const parseResUser = await responseUser.json();
    
    if (parseResUser.permission === "SUP") {
      pdtCtx.setUserPermission(true);
    } else {
      pdtCtx.setUserPermission(false);
    }
      
    } catch (err) {
        console.error(err.message)
    }
}

useEffect(() => {
    getUserPermission()
}, [])

console.log(pdtCtx.userPermission);

//Event handler

  const onChange = (e) => {
    pdtCtx.setSearchInputs({...pdtCtx.searchInputs, [e.target.name] : e.target.value})
}

const onSubmitForm = async(e) => {
  e.preventDefault();
  try {

      const response = await fetch (`http://localhost:5001/products/search/${code.toUpperCase()}/${size}`, {
      method: "GET",
      headers: {token: localStorage.token},
  });

  const parseRes = await response.json();

  console.log(parseRes)
  pdtCtx.setProductList(parseRes)

} catch (err) {
  console.error(err.message);
}
}
      
    return (
      <>
      <div className="flex-col items-center justify-center text-center mt-6">
        <h1>Search Products</h1>
          <form className="flex flex-row items-center justify-center mt-4" onSubmit={onSubmitForm}>
            <InputBox className="mb-6 mr-6 w-48" label="Code" type="text" name="code" value={code} onChange={onChange}/>
            <Dropdown className="mb-6 mr-6 w-24" label="Size" name="size" onChange={onChange} value="%25" firstOptionLabel="All"/>
            <Button type="submit" text="Search" />
          </form>
      </div>
    </>
    );
};

export default SearchPdt;
