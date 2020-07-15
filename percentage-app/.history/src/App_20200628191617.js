import React from "react";

function callFunction(a) {
  console.log(a);
}
var array = [];
const human = () => {
  array.push(Math.floor(Math.random() * (500 - 1 + 1) + 1));
};

const element = () => {
  human();
  return <div>{}</div>;
};
export default element;
