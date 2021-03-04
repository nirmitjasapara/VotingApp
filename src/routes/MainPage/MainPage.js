import React, { Component } from "react";
import CustomContext from "../../contexts/CustomContext";
import ApiService from "../../services/api-service";
import TokenService from "../../services/token-service";
import "./MainPage.css";
import "../../components/App/App.css";
import Poll from "../../components/Poll/Poll";

export default class MainPage extends Component {
  static contextType = CustomContext;

  handleVoteSuccess = polloption_id => {
    this.context.addCurrentVote(polloption_id);
  };

  componentDidUpdate(prevProps, prevState) {
    const { pollId } = this.props.match.params;
    if (parseFloat(pollId) !== this.context.poll.id) {
      if (pollId != null) {
        ApiService.getPoll(pollId)
          .then(this.context.setPoll)
          .catch(this.context.setError);
        if (TokenService.hasAuthToken()) {
          ApiService.getVote(pollId)
            .then(v => {
              if (v.length) this.context.addCurrentVote(v[0].id);
              else this.context.addCurrentVote(null);
            })
            .catch(this.context.setError);
        }
      }
    }
  }

  render() {
    return (
      <main className="main">
        {this.context.poll.id != null ? (
          <Poll onVoteSuccess={this.handleVoteSuccess} />
        ) : (
          <h3 className="default">Please select a poll</h3>
        )}
      </main>
    );
  }
}
