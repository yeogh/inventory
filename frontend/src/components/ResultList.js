import React, {useContext} from 'react';
import {toast} from "react-toastify";
import ProductContext from './product-context';

const ResultList = () => {

    const pdtCtx = useContext(ProductContext);

    const {code, size} = pdtCtx.searchInputs;

    const onClickMinus = async(element) => {
        // e.preventDefault();
        console.log(pdtCtx.productlist);
        try {
            let index = pdtCtx.productlist.indexOf(element);
            console.log(index);
            const id = pdtCtx.productlist[index]["product_id"];

            const response = await fetch (`http://localhost:5001/products/${id}`, {
            method: "PUT",
            headers: {token: localStorage.token},
             });

            const parseRes = await response.json();
            toast.success(parseRes)
            
            const responseSearch = await fetch (`http://localhost:5001/products/search/${code.toUpperCase()}/${size}`, {
            method: "GET",
            headers: {token: localStorage.token},
            });

            const parseResSearch = await responseSearch.json();

            console.log(parseResSearch);
            pdtCtx.setProductList(parseResSearch);
            
        } catch (err) {
            console.error(err.message)
        }
    }

   pdtCtx.setProductList(pdtCtx.productlist.sort((a, b) => b.product_id - a.product_id));
    
//    console.log(pdtCtx.productlist);

    const viewList = pdtCtx.productlist.map((element, index) => {
        return (
            <tr key={index} className="bg-white border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Product Code</span>{element.code}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Size</span>{element.size}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Option</span>{element.option}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Current Qty</span>{element.quantity}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">%age of Optimal Qty</span>{`${Math.floor(((element.quantity/element.quantity_optimal) * 100))}% of ${element.quantity_optimal}`}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                    <button className="btn bg-green-500 hover:bg-green-700 text-white border border-green-500 rounded-lg text-2xl px-4" onClick={() => onClickMinus(element)}>-</button>
                    <button className="btn bg-yellow-500 hover:bg-yellow-700 text-white border border-yellow-500 rounded-lg text-2xl px-3 ml-5">+</button>
                    <button className="btn bg-red-500 hover:bg-red-700 text-white py-1 px-2 border border-red-500 rounded-lg normal-case ml-5">Delete</button>
                </td>
            </tr>
        );
    })

    return (
        <>
            <div id="result">
                <h2 className="text-base p-2 text-gray-700">
                List of Results
                </h2>
                <table className="min-w-full border-collapse block md:table">
	                <thead className="block md:table-header-group">
  	                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto-left-full md:left-auto  md:relative ">
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Product Code</th>
			  	            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Size</th>
				            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Option</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Current Qty</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">% of Optimal Qty</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
						</tr>
		            </thead>
		            <tbody className="block md:table-row-group">
			        {viewList}
				    </tbody>
	            </table>
            </div>
        </>
    );
};

export default ResultList;