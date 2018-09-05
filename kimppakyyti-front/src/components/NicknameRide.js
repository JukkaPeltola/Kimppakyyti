import React, { Component } from "react";
import { deleteRideFromApi } from "./RideService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import RideMessages from "./RideMessages";

class NicknameRide extends Component {

  changeRide = () => {
    console.log("Nyt voin muuttaa kyydin asetuksia!")
  }

  deleteRideFromList = () => {
    deleteRideFromApi(this.props.singleride.id, () => {
      this.props.deleteRideFromList(this.props.singleride.id);
    });
  };
  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let start = new Date(this.props.singleride.startTime);
    start = start.toLocaleString("fi-FI", options);

    let end = new Date(this.props.singleride.endTime);
    end = end.toLocaleString("fi-FI", options);

    let onBoard = this.props.singleride.onBoard.map(function (ride, i) {
      return <p>{ride}</p>
    });
    return (
      <div>
        <br />
        <ListGroup>

          <ListGroupItem>
            Mistä: {this.props.singleride.startAddress}
          </ListGroupItem>
          <ListGroupItem>
            Mihin: {this.props.singleride.targetAddress}
          </ListGroupItem>
          <ListGroupItem>
            Aikaväli: {start} -{" "}
            {end}
          </ListGroupItem>
          <ListGroupItem>
            Paikkoja jäljellä: {this.props.singleride.seatsLeft}
          </ListGroupItem>
          <ListGroupItem>
            Kyydissä: {onBoard}
          </ListGroupItem>
        </ListGroup>
        <br />
        <Button type="button" onClick={this.changeRide}>
          Muuta
        </Button>
        &nbsp;
        <Button type="button" onClick={this.deleteRideFromList}>
          Poista
        </Button>
        <RideMessages RideId={this.props.singleride.RideId} />
        <br />
      </div>
    );
  }
}

export default NicknameRide;
