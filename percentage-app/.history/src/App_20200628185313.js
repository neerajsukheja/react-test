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

const element = () => {
  var hck = testhack();
  return <div>{hck[5]()}</div>;
};
export default element;
