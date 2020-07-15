import React from "react";

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.band.toUpperCase();
  const bandB = b.band.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = -1;
  } else if (bandA < bandB) {
    comparison = 1;
  }
  return comparison;
}

const element = () => {
  return <div></div>;
};
export default element;
