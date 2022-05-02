import React from 'react';

const Dropdown = ({className, label, name, onChange, value, firstOptionLabel}) => {
    return (
        <>
            <div className="mb-6 mr-6 w-24">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Size</label>
              <select className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1" name="size" onChange={onChange}>
                <option value="%25">All</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>  
        </>
    );
};

export default Dropdown;