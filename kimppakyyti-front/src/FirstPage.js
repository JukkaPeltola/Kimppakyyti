import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import "./FirstPage.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "./components/Date";
import { getProfile } from "./components/AuthService";
import { OfferNewRide, searchRide } from "./components/RideService";

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      offer: {},
      redirect: false,
      startTime: moment(),
      endTime: moment(),
      activeTab: "1",
      startAddress: "",
      targetAddress: "",
      profile: {},
      informationTemp: {}
    };
    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);
  }

  startTimeChanged(st) {
    this.setState({ startTime: st });
  }

  endTimeChanged(et) {
    this.setState({ endTime: et });
  }

  movetoRideSearch = () => {
    let informationTemp = {
      nickname: this.state.profile.nickname,
      startAddress: this.state.startAddress,
      targetAddress: this.state.targetAddress,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    };
    searchRide(informationTemp);
    this.props.history.push("/ridesearchpage");
  };

  OfferRide = e => {
    let informationTemp = {
      nickname: this.state.profile.nickname,
      startAddress: this.state.startAddress,
      targetAddress: this.state.targetAddress,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      mondayFrequency: this.refs.monday.checked,
      tuesdayFrequency: this.refs.tuesday.checked,
      wednesdayFrequency: this.refs.wednesday.checked,
      thursdayFrequency: this.refs.thursday.checked,
      fridayFrequency: this.refs.friday.checked,
      saturdayFrequency: this.refs.saturday.checked,
      sundayFrequency: this.refs.sunday.checked
    };
    console.log(informationTemp);
    OfferNewRide(informationTemp);
    this.setState({ offer: informationTemp });
    this.props.history.push("/ridesearchpage");
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChangeTarget(event) {
    this.setState({
      targetAddress: event.target.value
    });
  }

  handleChangeStart(event) {
    this.setState({
      startAddress: event.target.value
    });
  }

  componentDidMount() {
    getProfile((err, profile) => {
      console.log(profile);
      this.setState({ profile: profile });
    });
  }

  render() {
    return (
      <div>
        <Nav className="Row" tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Tarjoan kyytiä
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Etsin kyytiä
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h2>
                  <label>Mistä: </label>
                  <input
                    maxLength="50"
                    value={this.state.startAddress}
                    name="startAddress"
                    onChange={this.handleChangeStart.bind(this)}
                    type="text"
                    required
                  />{" "}
                  <br />
                  <label>Minne: </label>
                  <input
                    maxLength="50"
                    name="targetAddress"
                    onChange={this.handleChangeTarget.bind(this)}
                    value={this.state.targetAddress}
                    type="text"
                    required
                  />
                  <br />
                  <div className="center left">
                    <label>Valitse aikaväli miltä haet kyytiä</label>
                    <DatePicker />
                    <DatePicker />
                    <br />
                    <label>Toistuvat päivät</label>
                    <br />
                    <label>
                      <input ref="monday" type="checkbox" />
                      Ma
                    </label>
                    <label>
                      <input ref="tuesday" type="checkbox" />
                      Ti
                    </label>
                    <label>
                      <input ref="wednesday" type="checkbox" />
                      Ke
                    </label>
                    <label>
                      <input ref="thursday" type="checkbox" />
                      To
                    </label>
                    <label>
                      <input ref="friday" type="checkbox" />
                      Pe
                    </label>
                    <label>
                      <input ref="saturday" type="checkbox" />
                      La
                    </label>
                    <label>
                      <input ref="sunday" type="checkbox" />
                      Su
                    </label>
                    <br />
                  </div>
                  <Button
                    outline
                    color="secondary"
                    onClick={this.OfferRide}
                    type="button"
                  >
                    Tarjoa kyytiä
                  </Button>{" "}
                </h2>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h2>
                  <label>Mistä: </label>
                  <input
                    maxLength="50"
                    value={this.state.startAddress}
                    name="startAddress"
                    onChange={this.handleChangeStart.bind(this)}
                    type="text"
                    required
                  />{" "}
                  <br />
                  <label>Minne: </label>
                  <input
                    maxLength="50"
                    name="targetAddress"
                    onChange={this.handleChangeTarget.bind(this)}
                    value={this.state.targetAddress}
                    type="text"
                    required
                  />
                  <br />
                  <div className="center left">
                    <label>Valitse aikaväli miltä haet kyytiä</label>
                    <DatePicker />
                    <DatePicker />

                    <label>
                      <input ref="frequent" type="checkbox" />
                      Toistuva
                    </label>
                    <br />
                  </div>
                  <Button
                    outline
                    color="secondary"
                    onClick={this.movetoRideSearch}
                    type="button"
                  >
                    Etsi kyytiä
                  </Button>{" "}
                </h2>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default FirstPage;
