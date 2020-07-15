import React from "react";

function callFunction(a) {
  console.log(a);
}

const human = () => {
  for (i = 0; i < 500; i++) {
    var randomnumber = Math.floor(Math.random() * limit) + 1;
    document.write(randomnumber);
  }
};

const element = () => {
  return <div>{human()}</div>;
};
export default element;
