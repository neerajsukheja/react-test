import React from "react";

function callFunction(a) {
  console.log(a);
}

const human = () => {
  return Math.random() * (max - min) + min;
};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
