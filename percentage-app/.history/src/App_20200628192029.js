import React from "react";

function callFunction(a) {
  console.log(a);
}
const human = () => {
  var arr = [];
  while (arr.length < 51) {
    var r = Math.floor(Math.random() * 5000) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
