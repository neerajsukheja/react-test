import React from "react";

function callFunction(a) {
  console.log(a);
}
const human = () => {
  console.log("Hello");
};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
