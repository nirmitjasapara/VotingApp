import React, { Component } from "react";
import CustomContext from "../../contexts/CustomContext";
import ApiService from "../../services/api-service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import "../../components/App/App.css";

export default class SideBar extends Component {
  static contextType = CustomContext;

  state = { closed: true };

  componentDidMount() {
    this.context.clearError();
    this.context.clearPoll();
    ApiService.getPolls()
      .then(this.context.setPolls)
      .catch(this.context.setError);
  }

  renderPollList() {
    const { polls = [] } = this.context;
    return polls.map(p => (
      <Link
        to={"/poll/" + p.id}
        key={"/poll/" + p.id}
        type="button"
        className="list-item"
      >
        <h3>{p.name}</h3>
      </Link>
    ));
  }

  handleToggle() {
    this.setState({ closed: !this.state.closed });
  }

  render() {
    const toggle = this.state.closed ? "sidebar-closed" : "";
    return (
      <nav className={toggle}>
        <div className="sidebar">{this.renderPollList()}</div>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => this.handleToggle()}
          className="bar"
        />
        <Link to="/add" type="button" className="add-button">
          <FontAwesomeIcon icon={faPlus} className="icon" />
        </Link>
      </nav>
    );
  }
}
