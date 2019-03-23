import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      value: "all",
      filter: "",
      currentId: modelInstance.getCurrentId()
    };
    this.valueUpdate = this.valueUpdate.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.filterUpdate = this.filterUpdate.bind(this);
    this.currentIdUpdate = this.currentIdUpdate.bind(this);
  }

  decodeUrlBar() {
    var currentURL = window.location.search.replace("?", "");
    var componentArray = [
      currentURL.slice(0, currentURL.lastIndexOf("&")),
      currentURL.slice(currentURL.lastIndexOf("&"))
    ];
    for (var elem in componentArray) {
      var newElem = componentArray[elem].slice(
        componentArray[elem].lastIndexOf("=")
      );
      componentArray[elem] = newElem.replace("=", "");
    }
    return componentArray;
  }

  valueUpdate(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
    console.log(event.target.value);
  }

  filterUpdate(event) {
    this.setState({ filter: event.target.value });
  }

  currentIdUpdate(event) {
    modelInstance.setCurrentId(event.target.value);
    this.setState({ currentId: modelInstance.getCurrentId() });
  }

  submitClick() {
    setTimeout(() => this.componentDidMount(), 100);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    var searchArray = this.decodeUrlBar();
    console.log(searchArray);

    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes(searchArray[0], searchArray[1])
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
        console.log(this.decodeUrlBar());
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <div id="loader" />;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          <Link to={"/details/id=?" + dish.id}>
            <div className="dishImage" key={dish.id}>
              <img
                src={"https://spoonacular.com/recipeImages/" + dish.image}
                height="150px"
                width="200px"
              />
              <div>{dish.title}</div>
            </div>
          </Link>
        ));
        break;
      default:
        dishesList = <b>Someting went wrong, please try again</b>;
        break;
    }

    return (
      <div className="col-md-9">
        <b>FIND A DISH</b>
        <div className="col-md-9" id="selectView">
          <input
            id="searchText"
            type="text"
            placeholder="Enter keyword..."
            value={this.state.filter}
            onChange={this.filterUpdate}
          />
          <select
            id="searchType"
            value={this.state.value}
            onChange={this.valueUpdate}
          >
            <option value="All">All</option>
            <option value="main+course">Main Course</option>
            <option value="side dish">Side Dish</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="bread">Bread</option>
            <option value="soup">Soup</option>
            <option value="beverage">Beverage</option>
            <option value="sauce">Sauce</option>
            <option value="drink">Drink</option>
          </select>
          <Link
            to={
              "/search/?query=" +
              this.state.filter +
              "&type=" +
              this.state.value
            }
          >
            <button
              type="button"
              class="btn btn-warning"
              id="searchButton"
              onClick={this.submitClick}
            >
              Search
            </button>
          </Link>
        </div>
        {dishesList}
      </div>
    );
  }
}

export default Dishes;
