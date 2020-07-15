import React from "react";

function callFunction(a) {
  console.log(a);
}

var x = 21;
var test_result = function () {
  console.log(x);
  var x = 20;
};
test_result();

const element = () => {
  return <div>{callFunction("1111")}</div>;
};
export default element;
