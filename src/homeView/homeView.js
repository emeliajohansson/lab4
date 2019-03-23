import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homeView.css";
import "bootstrap/dist/css/bootstrap.css";

class homeView extends Component {
  render() {
    return (
      <div className="Welcome" align="center">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          scelerisque gravida leo, eu malesuada enim varius id. Suspendisse
          dapibus id erat in maximus. Mauris vitae eros libero. Vivamus non
          viverra ipsum. Ut sit amet varius turpis. Donec ut lectus orci. Cras
          velit urna, laoreet in suscipit eu, maximus sed turpis. Morbi
          vestibulum porttitor massa, id suscipit diam viverra vitae. Aliquam
          erat volutpat. Nulla sodales mauris nibh, a pulvinar dui faucibus
          eget. Duis auctor massa volutpat risus elementum, non cursus sem
          gravida.
        </p>
        <Link to="/search">
          <button
            type="button"
            className="btn btn-warning"
            id="createDinnerBtn"
          >
            Create new dinner
          </button>
        </Link>
      </div>
    );
  }
}

export default homeView;
