import React from 'react';

const RButton = ({children, ...props}) => {
    return (
        <button className="button" {...props} onClick={props.onClick}>{children}</button>
    );
};

export default RButton;
