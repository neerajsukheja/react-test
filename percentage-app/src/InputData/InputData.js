import React from "react";
import "./InputData.css";
import UseContext from "../reducer/context";

const InputData = (props) => {
  return (
    <div className="InputDataDiv">
      <UseContext.Consumer>
        {(context) => <div>{context.value}</div>}
      </UseContext.Consumer>
      <input type="text" value={props.name} onChange={props.change} />
      <button onClick={props.delete}>Delete Me</button>
    </div>
  );
};

export default InputData;
