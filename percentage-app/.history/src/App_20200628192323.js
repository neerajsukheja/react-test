import React from "react";

function callFunction(a) {
  console.log(a);
}
const human = () => {};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
