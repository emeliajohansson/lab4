import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./ConfirmDishes.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class ConfirmDishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    };
    this.selectedDishObj = this.selectedDishObj.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
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

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    console.log(document.cookie);
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    return (
      <div className="container" align="center" id="detailView">
        <div className="row">
          <h3 className="col-md-6">
            {"My Dinner: " + this.state.numberOfGuests + " people"}
          </h3>
          <Link to="/search">
            <button id="backEditDinnerButton" className="btn" role="button">
              Go back and edit dinner
            </button>
          </Link>
        </div>
        <hr />
        <div className="row" id="bar">
          <div className="col-md-12">
            {this.state.fullMenu.map(dish => (
              <div className="dishImage" key={dish.id}>
                <img src={dish.image} height="150px" width="200px" />
                <div>{dish.title}</div>
                <p>
                  {dish.extendedIngredients.length * this.state.numberOfGuests +
                    " SEK"}
                </p>
              </div>
            ))}
            <hr />
          </div>

          <div className="row" id="bar">
            <div className="col-md-6">
              <strong>
                {"Total SEK :" +
                  this.state.numberOfGuests * this.state.fullMenuPrice}
              </strong>
            </div>

            <div className="col-md-6">
              <Link to="/fullRecipe">
                <button id="printRecipeButton" className="btn" role="button">
                  Print Full Recipe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDishes;
