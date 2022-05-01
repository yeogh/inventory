import { useState, useEffect } from "react";
import callApi from "../callApi";

//Assets
import Button from "./assets/Button";


const SearchPdt = () => {
  const [searchInputs, setSearchInputs] = useState({
    code:"",
    size:""
  })    
  const [productlist, setProductList] = useState([]);

  const {code, size} = searchInputs;

  const onChange = (e) => {
    setSearchInputs({...searchInputs, [e.target.name] : e.target.value})
}

const onSubmitForm = async(e) => {
  e.preventDefault();
  try {

      const response = await fetch (`http://localhost:5001/products/search/${code}/${size}`, {
      method: "GET",
      headers: {token: localStorage.token},
  });

  const parseRes = await response.json();

  console.log(parseRes)
  setProductList(parseRes)

} catch (err) {
  console.error(err.message);
}
}


  const viewList = productlist.map((element, index) => {
    return (
      <tr key={index}>
      <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
        {element.code}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        {element.size}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        {element.option}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        {element.quantity}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        {`${((element.quantity/element.quantity_optimal) * 100)}"% of" ${element.quantity_optimal}`}
      </td>
    </tr>
    );
  })
    
    
    return (
      <>
      <div className="flex-col items-center justify-center text-center">
        <h1>Search Products</h1>
          <form className="flex flex-row items-center justify-center mt-4" onSubmit={onSubmitForm}>
            <div className="mb-6 mr-6 w-48">
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Code</label>
              <input type="text" id="code" className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1" required name="code" value={code} onChange={onChange}/>
            </div>
            <div className="mb-6 mr-6 w-24">
              <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Size</label>
              <select id="size" className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1" name="size" onChange={onChange}>
                <option value="%25">All</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <Button type="submit" text="Search" />
          </form>
      </div>
      <div id="result">
            <h2 className="text-base font-bold p-2 text-gray-700">
            List of Results
            </h2>
            <div className="relative rounded-xl overflow-auto">
              <div className="shadow-sm overflow-hidden my-5">
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
                      Product Code
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Size
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Option
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Current Quantity
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Percent of Optimal Quantity
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Record
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Add
                      </th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                      Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>{viewList}</tbody>
                </table>
              </div>
            </div>
          </div>                   
    </>
    );
};

export default SearchPdt;
