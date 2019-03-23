import React, { Component } from "react";
import { Route } from "react-router-dom";
import homeView from "./homeView/homeView";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import "./App.css";
import DishView from "./DishView/DishView";
import ConfirmView from "./ConfirmView/ConfirmView";
import FullRecipe from "./FullRecipe/FullRecipe";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <div className="jumbotron jumbotron-fluid">
          <h1 id="myHeader">Dinner planner</h1>
        </div>

        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={homeView} />
        <Route
          path="/search"
          render={() => <SelectDish model={modelInstance} />}
        />
        <Route
          path="/details/:id"
          render={() => <DishView model={modelInstance} />}
        />
        <Route
          path="/confirmDinner"
          render={() => <ConfirmView model={modelInstance} />}
        />
        <Route
          path="/fullRecipe"
          render={() => <FullRecipe model={modelInstance} />}
        />
      </div>
    );
  }
}

export default App;
