import React from "react";

function callFunction(a) {
  console.log(a);
}

const human = {
  age: 10,
  grow: () => {
    this.age++;
  },
};
human.grow();
console.log(human.age);

const element = () => {
  return <div>{String(undefined)}</div>;
};
export default element;
