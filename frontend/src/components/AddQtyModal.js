import React from 'react';

//Assets
import InputBox from './assets/InputBox';
import Button from './assets/Button';

const AddQtyModal = ({onClickClose, modalCode, modalName, modalSize, modalOption, modalQty, increaseQty, onChange, onSubmitModal}) => {

    return (
    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-base font-bold">
                        Add Quantity
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal" onClick={onClickClose}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <form onSubmit={onSubmitModal}>
                        <div className="relative p-6 flex-auto">
                            <div className="flex flex-row justify-evenly mb-3">
                                <div id="code" className="w-40">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Product Code</label>
                                    <p className="h-12 px-4 text-sm text-gray-700">{modalCode}</p>
                                </div>
                                <div id="name" className="w-40">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <p className="h-12 px-4 text-sm text-gray-700">{modalName}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly mb-3">
                                <div id="size" className="w-40">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                    <p className="h-12 px-4 text-sm text-gray-700">{modalSize}</p>
                                </div>
                                <div id="option" className="w-40">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Option</label>
                                    <p className="h-12 px-4 text-sm text-gray-700">{modalOption}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly">
                                <div id="quantity" className="w-40">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                    <p className="h-12 px-4 text-sm text-gray-700">{modalQty}</p>
                                </div>
                                <InputBox className="mb-6 mr-6 w-40" label="Add" type="number" name="increase" value={increaseQty} onChange={onChange}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <Button type="submit" text="Confirm" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-70 bg-black"></div>
    </>
    );
};

export default AddQtyModal;