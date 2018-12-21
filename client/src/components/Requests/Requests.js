import React, { Component } from "react";
import RequestsCards from "./RequestsCards";
import RequestService from "../../services/request-service";
import "./Requests.css"


class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      listOfRequests: []
    };
    this.service = new RequestService();
  }
  componentDidMount = () => {
    this.setState({ user: this.props.user });
    this.getAll(this.props.user._id);
  };

  getAll = hostId => {
    this.service.getAll(hostId).then(requests => {
      if (requests.myrequests) {
        const listOfRequestsIds = requests.myrequests.concertRequest;
        const requestList = [];
        listOfRequestsIds.forEach((request) => {
          this.service.getOne(request._id)
            .then(request => {
              requestList.push(request.request);
              this.setState({ listOfRequests: requestList })
            })
        })
      }
    });
  };
  render() {
    const listOfRequests = this.state.listOfRequests;
    return (
      <>
      <h1 className="request-title">REQUESTS</h1>
        {listOfRequests.length > 0 ? (
          listOfRequests.map((request, i) => { return (<RequestsCards key={i} update={(e) => this.getAll(e)} request={request} user={this.props.user} />) })
        ) : (
            <h3 style={{ margin: "4%" }}>You don't have any requests for the moment! </h3>
          )}
      </>
    );
  }
}

export default Requests;
