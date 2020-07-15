import React from 'react';

function getName(name) {
  return name.firstName + ' ' + name.lastName.toLowerCase();
}

const myname = {
  firstName: 'Bob',
  lastName: 'Dylan'
};

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
  const singers = [
    { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
    { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
    { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
    { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
  ];
  const value = singers.sort(compare);


  return (
    <ul>
      {value.map(response => {
        return <li>{response.name} {response.band}</li>
      })}
    </ul>
  );

}
export default element;
