import React from 'react';
import './ValidationComponent.css';

const validation = (props) => {
    let value = 'Small Value';
    if(props.length > 10){
        value = "Good Value";
    }
    return (
        <div className="Validation">
            <p>{value}</p>
        </div>
    );
}

export default validation;