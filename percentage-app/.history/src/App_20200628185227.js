import React from "react";

function callFunction(a) {
  console.log(a);
}

function testhack() {
  var hck = [];
  for (var x = 0; x < 10; x++)
    hck[x] = function () {
      return x;
    };
  return hck;
}
var hck = testhack();
hck[5]();

const element = () => {
  return <div>{test_result()}</div>;
};
export default element;
