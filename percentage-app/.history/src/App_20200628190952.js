import React from "react";

function callFunction(a) {
  console.log(a);
}

const human = () => {
  return Math.random() * 500;
};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
