import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./DetailView.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class DetailView extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishId: "",
      numberOfGuests: modelInstance.getNumberOfGuests(),
      currentDishId: null,
      displayedDish: null,
      fullMenu: []
    };
    this.selectedDishObj = this.selectedDishObj.bind(this);
    this.showallIngredients = this.showallIngredients.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu()
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    modelInstance.setNumberOfGuests(e.target.value);
  };

  selectedDishObj(e) {
    e.preventDefault();
    modelInstance.addDishToMenu(
      this.state.currentDishId,
      this.state.displayedDish
    );
  }

  showallIngredients() {
    let ingredCount = 0;
    let unsortedList = [];
    let currentIngredients = this.state.displayedDish.extendedIngredients;
    for (var ingred in currentIngredients) {
      unsortedList.push(
        <li key={currentIngredients[ingred].id}>
          {this.state.numberOfGuests * currentIngredients[ingred].amount +
            " " +
            currentIngredients[ingred].unit +
            " " +
            currentIngredients[ingred].name +
            ", " +
            this.state.numberOfGuests +
            " SEK"}
        </li>
      );
      ingredCount += 1;
    }
    unsortedList.push(
      <strong key="totalPrice">
        {"SEK " + this.state.numberOfGuests * ingredCount}
      </strong>
    );

    return unsortedList;
  }

  componentDidMount() {
    var currentURL = window.location.search.replace("?", "");
    this.setState({
      currentDishId: currentURL
    });

    modelInstance.addObserver(this);
    modelInstance
      .getSpecificDish(currentURL)
      .then(displayedDish => {
        this.setState({
          status: "LOADED",
          displayedDish: displayedDish
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <div id="loader" />;
      case "LOADED":
        return (
          <div className="col-sm-9">
            <div key={this.state.displayedDish.id} className="row">
              <div id="displayView" className="col-md-6">
                <h3>{this.state.displayedDish.title}</h3>
                <img src={this.state.displayedDish.image} />
                <p>{this.state.displayedDish.instructions}</p>
              </div>

              <div id="dishTable" className="col-md-4">
                <p>
                  <b>Ingredients for {this.state.numberOfGuests} people</b>
                </p>
                <ul>{this.showallIngredients()}</ul>
                <hr />
                <div className="col-md-6 row">
                  <Link to="/search">
                    <button
                      id="backEditDinnerButton"
                      className="btn"
                      role="button"
                    >
                      Go back and edit dinner
                    </button>
                  </Link>

                  <button
                    id="addToMenuButton"
                    className="btn"
                    role="button"
                    onClick={this.selectedDishObj}
                  >
                    Add to menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <b>Someting went wrong, check your connection and please try again</b>
        );
    }
  }
}

export default DetailView;
