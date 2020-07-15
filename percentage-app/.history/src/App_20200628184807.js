import React from "react";

function callFunction(a) {
  console.log(a);
}

var x = 21;
var test_result = function () {
  console.log(x);
  var x = 20;
};

const element = () => {
  return <div>{test_result()}</div>;
};
export default element;
