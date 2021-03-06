import React, {useContext, useState} from 'react';
import {toast} from "react-toastify";
import ProductContext from './product-context';

import AddQtyModal from './AddQtyModal';
import DeleteModal from './DeleteModal';


const ResultList = () => {

    const pdtCtx = useContext(ProductContext);

    const [singlePdt, setSinglePdt] = useState({
        code: "",
        name: "",
        size: "",
        option:"",
        quantity:"",
        created_name:"",
        quantity_sold:""
    })
    const [qtyToIncrease, setQtyToIncrease] = useState("");
    const [addQty, setAddQty] = useState(false);
    const [deletePdt, setDeletePdt] = useState(false);

    const {code, size} = pdtCtx.searchInputs;


    //Update product (Minus)
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

    //Update product (Plus)
    const onClickClosePlus = () => {
        setAddQty(false);
        setQtyToIncrease("");
    }

    const onClickPlus = async(element) => {
        try {
            let indexplus = pdtCtx.productlist.indexOf(element);
            console.log(indexplus);
            const idplus = pdtCtx.productlist[indexplus]["product_id"];

            const response = await fetch (`http://localhost:5001/products/${idplus}`, {
            method: "GET",
            headers: {token: localStorage.token},
             });

            const parseRes = await response.json();
            console.log(parseRes);
            setSinglePdt(parseRes);
            console.log(singlePdt);
            
            setAddQty(true);
            
        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitAddModal = async(e) => {
        e.preventDefault();
        try {
            if (qtyToIncrease > 0) {
            const body = {increase: qtyToIncrease};

            const response = await fetch(`http://localhost:5001/products/${singlePdt[0]["product_id"]}`, {
                method: "PATCH",
                headers: {token: localStorage.token,
                "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            toast.success(parseRes)

            setAddQty(false);
            setSinglePdt({
                code: "",
                name: "",
                size: "",
                option:"",
                quantity:"",
                created_name: "",
                quantity_sold:""
            })
            setQtyToIncrease("");

            const responseList = await fetch (`http://localhost:5001/products/search/${code.toUpperCase()}/${size}`, {
            method: "GET",
            headers: {token: localStorage.token},
             });

            const parseResList = await responseList.json();

            console.log(parseResList)
            pdtCtx.setProductList(parseResList)

        } else {
            toast.error("quantity to add should be more than 0");
        }

        } catch (err) {
            console.error(err.message)
        }
    }


    //Delete product
    const onClickCloseDelete = () => {
        setDeletePdt(false);
    }

    const onClickDelete = async(element) => {

        try {
            let indexdelete = pdtCtx.productlist.indexOf(element);
            console.log(indexdelete);
            const iddelete = pdtCtx.productlist[indexdelete]["product_id"];

            if(pdtCtx.productlist[indexdelete]["quantity_sold"] !== 0) {
                toast.error("product with sales record cannot be deleted");
            } else {
            const response = await fetch (`http://localhost:5001/products/${iddelete}`, {
                method: "GET",
                headers: {token: localStorage.token},
             });

            const parseRes = await response.json();
            console.log(parseRes);
            setSinglePdt(parseRes);
            console.log(singlePdt);
            
            setDeletePdt(true); 
        }          
           
        } catch (err) {
            console.error(err.message)
        }
        
    };

    const onSubmitDeleteModal = async(e) => {
        e.preventDefault();
        try {
            
            const response = await fetch (`http://localhost:5001/products/${singlePdt[0]["product_id"]}`, {
            method: "DELETE",
            headers: {token: localStorage.token},
             });


            const parseRes = await response.json();

            toast.success(parseRes);
            
            setDeletePdt(false);
            setSinglePdt({
                code: "",
                name: "",
                size: "",
                option:"",
                quantity:"",
                created_name: "",
                quantity_sold:""
            })

            const responseSearch = await fetch (`http://localhost:5001/products/search/${code.toUpperCase()}/%25`, {
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


    //View List
    const computePercent = (qty, qtyoptimal) => {
        const percent = Math.floor(((qty/qtyoptimal) * 100));
        return percent;
    };

   
    const viewList = pdtCtx.productlist.map((element, index) => {
        return (
            <tr key={index} className="bg-white border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Product Code</span>{element.code}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Size</span>{element.size}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Option</span>{element.option}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Current Qty</span>{element.quantity}</td>
                <td className={`p-2 md:border md:border-grey-500 text-left block md:table-cell ${computePercent(element.quantity, element.quantity_optimal) < 21 ? "text-red-500 font-medium md:text-red-500 md:font-medium" : ""}`}><span className="inline-block w-1/3 md:hidden font-bold">%age of Optimal Qty</span>{computePercent(element.quantity, element.quantity_optimal)}{`% of ${element.quantity_optimal}`}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Qty Sold</span>{element.quantity_sold}</td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                    {/* <ButtonMinus element={element}/> */}
                    <button className="btn bg-green-500 hover:bg-green-700 text-white border border-green-500 rounded-lg text-2xl px-4" onClick={() => onClickMinus(element)}>-</button>
                    <button className="btn bg-yellow-500 hover:bg-yellow-700 text-white border border-yellow-500 rounded-lg text-2xl px-3 ml-5" data-modal-toggle="defaultModal" onClick={() => onClickPlus(element)}>+</button>
                    {pdtCtx.userPermission? 
                    <button className="btn bg-red-500 hover:bg-red-700 text-white py-1 px-2 border border-red-500 rounded-lg normal-case ml-5" onClick={() => onClickDelete(element)}>Delete</button> : ""}
                </td>
            </tr>
        );
    })

    return (
        <>
            <div id="result">
                <h2 className="text-base p-2 text-gray-700">
                List of Results {`(${pdtCtx.productlist.length} record(s))`}
                </h2>
                <table className="min-w-full border-collapse block md:table">
	                <thead className="block md:table-header-group">
  	                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto-left-full md:left-auto  md:relative ">
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Product Code</th>
			  	            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Size</th>
				            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Option</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Current Qty</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">% of Optimal Qty</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Qty Sold</th>
                            <th className="bg-gray-600 p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
						</tr>
		            </thead>
		            <tbody className="block md:table-row-group">
			        {viewList}
				    </tbody>
	            </table>
            </div>

            {addQty? <AddQtyModal onClickClose={onClickClosePlus} modalCode={singlePdt[0]["code"]} modalName={singlePdt[0]["name"]} modalSize={singlePdt[0]["size"]} modalOption={singlePdt[0]["option"]} modalQty={singlePdt[0]["quantity"]} increaseQty={qtyToIncrease} onChange={(e) => setQtyToIncrease(e.target.value)} createdBy={singlePdt[0]["created_name"]}onSubmitModal={onSubmitAddModal}/> : null}

            {deletePdt? <DeleteModal onClickClose={onClickCloseDelete} modalCode={singlePdt[0]["code"]} modalName={singlePdt[0]["name"]} modalSize={singlePdt[0]["size"]} modalOption={singlePdt[0]["option"]} modalQty={singlePdt[0]["quantity"]} createdBy={singlePdt[0]["created_name"]} onSubmitModal={onSubmitDeleteModal}/> : null}
        </>
    );
};

export default ResultList;