import React from 'react';

const Button = ({ type, onClick, value, text }) => {
    return (
        <button className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case"
        type={type}
        onClick={onClick}
        value={value}
        >
        {text} 
    </button>
    );
};

export default Button;