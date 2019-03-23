import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenuList: this.props.model.getFullMenu(),
      fullMenuPrice: this.props.model.getFullMenuPrice()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      fullMenuList: this.props.model.getFullMenu(),
      fullMenuPrice: this.props.model.getFullMenuPrice()
    });
  }

  dishRemover = e => {
    e.preventDefault();
    this.props.model.removeDishFromMenu(
      e.target.value,
      this.state.fullMenuList
    );
  };

  conslog(e) {
    e.preventDefault();
    console.log("waddup");
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div id="sidebarView" className="col-md-3">
        <nav className="navbar navbar-expand-md navbar-light">
          <button
            className="navbar-toggler d-md-none"
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-expanded="false"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
            onClick={this.conslog}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="nav navbar-nav collapse navbar-collapse">
              <div className="column">
                <h4>My Dinner</h4>

                <p>
                  Guests:
                  <input
                    id="guests"
                    type="number"
                    value={this.state.numberOfGuests}
                    size="3"
                    onChange={this.onNumberOfGuestsChanged}
                  />
                </p>
              </div>
              <div id="menuTable" className="col-sm-12">
                <hr />
                <div id="menuTable" className="row">
                  <b className="col-6">Dish Name</b>
                  <b className="col-6">Cost</b>
                </div>
                <hr />
              </div>
              <div id="menuTable">
                {this.state.fullMenuList.map(dish => (
                  <div className="row selectedDish" key={dish.id}>
                    <div className="col-6" align="left">
                      {dish.title}
                    </div>
                    <div className="col-6" align="right">
                      {dish.extendedIngredients.length *
                        this.state.numberOfGuests +
                        " SEK"}
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <div className="col-sm-12" />
              <div className="col-sm-12">
                <hr />
                <p>
                  SEK:
                  {" " +
                    this.state.numberOfGuests *
                      Math.round(this.state.fullMenuPrice) +
                    " "}
                </p>
              </div>
              <Link to="/confirmDinner">
                <button id="confirmDinnerButton" className="btn" role="button">
                  Confirm Dinner
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
