import React from 'react';

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

  return (
    <ul>
      {value.map(response => {
        return <li>{response.name} {response.band}</li>
      })}
    </ul>
  );

}
export default element;
