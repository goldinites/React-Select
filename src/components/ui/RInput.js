import React from 'react';

const RInput = ({label, ...props}) => {
    const inputId = `input-${(Math.random() * Date.now()).toFixed(0)}`;

    return (
        <div className="input-wrapper">
            { label ? <label className="label" htmlFor={inputId}>{label}</label> : '' }
            <input className="input" {...props} id={inputId} onChange={props.onChange} />
        </div>
    );
};

export default RInput;
