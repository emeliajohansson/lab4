import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./FullRecipe.css";
import { Link } from "react-router-dom";

class FullRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenuList: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    };
  }

  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenuList: modelInstance.getFullMenu(),
      fullMenuPrice: modelInstance.getFullMenuPrice()
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    modelInstance.setNumberOfGuests(e.target.value);
  };

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    return (
      <div className="container" align="center">
        <div className="row">
          <h4 className="col-md-6">
            {"My Dinner: " + this.state.numberOfGuests + " people"}
          </h4>
          <div className="col-md-6">
            <Link to="/confirmDinner">
              <button id="backEditDinnerButton" className="btn" role="button">
                Go back and edit dinner
              </button>
            </Link>
          </div>
        </div>
        <hr />
        <div className="row">
          {this.state.fullMenuList.map(dish => (
            <div className="row" id="dishes" key={dish.id}>
              <div className="col-md-6">
                <h4>{dish.title}</h4>
                <img src={dish.image} height="300px" />
              </div>

              <div className="col-md-6" id="preperation">
                <h4>Preparation</h4>
                <p>{dish.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default FullRecipe;
