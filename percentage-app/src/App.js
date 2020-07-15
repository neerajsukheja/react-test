import React, { Component } from "react";
import InputData from "./InputData/InputData";
import { connect } from "react-redux";

import UseContext from "./reducer/context";

class App extends Component {
  state = {
    person: [],
  };
  checkForVowels = () => {
    const value = "FindVowelsPositionOnThisString";
    const vowels = ["a", "e", "i", "o", "u"];
    const indexValue = value.split("").find((response, index) => {
      if (vowels.includes(response)) {
        return response;
      }
    });
    /* .reduce((a, b) => {
        return `${a},${b}`;
      }); */
    console.log("checkForVowels", indexValue);
  };

  sortMultidimesionalArray = () => {
    const arr = [
      [12, "AAA"],
      [12, "BBB"],
      [12, "CCC"],
      [28, "DDD"],
      [18, "CCC"],
      [12, "DDD"],
      [18, "CCC"],
      [28, "DDD"],
      [28, "DDD"],
      [58, "BBB"],
      [68, "BBB"],
      [78, "BBB"],
    ];
    const sortByNumber = arr.sort(function (a, b) {
      return a[0] - b[0];
    });
    const sortByDigit = arr.sort(function (a, b) {
      return b[0] - a[0];
    });
    console.log("sortMultidimesionalArrayByNumber", sortByNumber);
    console.log("sortMultidimesionalArrayByString", sortByDigit);

    const objectArray = [
      { number: 1, name: "N" },
      { number: 3, name: "A" },
      { number: 2, name: "C" },
      { number: 8, name: "D" },
      { number: 9, name: "F" },
      { number: 6, name: "S" },
    ];
    const sortedResult = objectArray.sort((a, b) => {
      return a.number - b.number;
    });
    const sortedResultString = objectArray.sort((a, b) => {
      return b.name - a.name;
    });
    console.log("sortedResultWithObjectNumber", sortedResult);
    console.log("sortedResultWithObjectWithString", sortedResultString);
  };

  readData = () => {
    const arrayOfArray = [
      [1, 2],
      [3, 4],
      [
        5,
        {
          name: "neeraj",
          age: {
            new: 10,
            old: 20,
          },
        },
      ],
    ];
    console.log("readData", arrayOfArray[2][1].age.new);
  };

  addMore = () => {
    const person = this.state.person;
    person.push({
      name: "",
    });
    this.setState({ person: person });
  };

  onChangeHandler = (event, index) => {
    const person = this.state.person;
    person[index].name = event.target.value;
    this.setState({ person: person });
  };
  onDeleteHandler = (index) => {
    const person = this.state.person;
    person.splice(index, 1);
    this.setState({ person: person });
  };
  render() {
    let person = null;
    if (this.state.person) {
      console.log(this.state.person);
      person = this.state.person.map((response, index) => {
        return (
          <UseContext.Provider value={{ count: 3 }}>
            <InputData
              name={response.name}
              change={(event) => this.onChangeHandler(event, index)}
              delete={() => this.onDeleteHandler(index)}
            />
          </UseContext.Provider>
        );
      });
    }

    let ingredientsDisplay = null;
    if (this.props.ing) {
      ingredientsDisplay = Object.entries(this.props.ing).map(
        (response, index) => {
          return (
            <div key={index}>
              <button onClick={() => this.props.onIngredientAdd(response[0])}>
                Add
              </button>
              {response[0]} : {response[1]}
              <button
                onClick={() => this.props.onIngredientRemove(response[0])}
              >
                Remove
              </button>
            </div>
          );
        }
      );
    }
    return (
      <React.Fragment>
        <button onClick={() => this.checkForVowels()}>Check For vowels</button>
        <br />
        <button onClick={() => this.sortMultidimesionalArray()}>
          Sort Array By String
        </button>
        <button onClick={() => this.readData()}>Read Data</button>
        <br />
        {person}

        <button onClick={() => this.addMore()}>Add More</button>
        <button onClick={() => this.showInArray()}>Show in Array</button>
        {ingredientsDisplay}
        {this.props.total}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.ingredients,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) =>
      dispatch({
        type: "ADD_INGREDIENT",
        value: ingName,
      }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: "REMOVE_INGREDIENT",
        value: ingName,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
