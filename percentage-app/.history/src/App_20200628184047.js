import React from "react";

function callFunction(a) {
  console.log(a);
}

const element = () => {
  return <div>{callFunction("1111")}</div>;
};
export default element;
