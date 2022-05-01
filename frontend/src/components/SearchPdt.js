import { useState, useEffect } from "react";

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
      <tr key={index} className="bg-white border border-grey-500 md:border-none block md:table-row">
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Product Code</span>{element.code}</td>
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Size</span>{element.size}</td>
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Option</span>{element.option}</td>
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Current Qty</span>{element.quantity}</td>
        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">%age of Optimal Qty</span>{`${((element.quantity/element.quantity_optimal) * 100)}% of ${element.quantity_optimal}`}</td>
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
					<span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button className="btn bg-green-500 hover:bg-green-700 text-white py-1 px-2 border border-green-500 rounded-lg normal-case">Minus</button>
          <button className="btn bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 border border-yellow-500 rounded-lg normal-case ml-5">Edit</button>
					<button className="btn bg-red-500 hover:bg-red-700 text-white py-1 px-2 border border-red-500 rounded-lg normal-case ml-5">Delete</button>
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
        <table className="min-w-full border-collapse block md:table">
	        <thead className="block md:table-header-group">
  	        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto-left-full md:left-auto  md:relative ">
              <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Product Code</th>
			  	    <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Size</th>
				      <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Option</th>
              <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Current Qty</th>
              <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">% of Optimal Qty</th>
              <th class="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
						</tr>
		      </thead>
		      <tbody class="block md:table-row-group">
			    {viewList}
					</tbody>
	      </table>
      </div>                   
    </>
    );
};

export default SearchPdt;
