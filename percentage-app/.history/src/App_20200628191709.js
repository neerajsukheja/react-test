import React from "react";

function callFunction(a) {
  console.log(a);
}
const human = () => {
  var arr = [];
  while (arr.length < 8) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
};

const element = () => {
  human();
  return <div>{array}</div>;
};
export default element;
