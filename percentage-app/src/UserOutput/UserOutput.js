import React, { useState } from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    const [getState, setState] = useState({
        "key": "Paragraph"
    });

    const changeKeyHandler = () => {
        setState({
            "key": "Changed Paragraph"
        })
    }

    return (
        <div className="UserOutput">
            <button onClick={changeKeyHandler}>Change Key</button>
            <p>{getState.key} : {props.data}</p>
        </div>
    );
}

export default userOutput;