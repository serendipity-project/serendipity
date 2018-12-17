import React, { Component } from "react";
import RequestsCards from "./RequestsCards";
import RequestService from "../../services/request-service";

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
      // console.log(requests.myrequests.concertRequest,'requests');

      if (requests.myrequests) {
        const listOfRequestsIds = requests.myrequests.concertRequest;
        // console.log(listOfRequestsIds);
        const requestList = [];
        listOfRequestsIds.forEach((request) => {
          this.service.getOne(request._id)
            .then(request => {
              requestList.push(request.request);
              this.setState({ listOfRequests: requestList })
              console.log(requestList);
            })
        })
        // console.log(requestList);

      } else {
        alert("Este host no tiene requests limpiar codifgo");
      }

    });
  };

  render() {
    const listOfRequests = this.state.listOfRequests;
    return (
      <>
        {listOfRequests.map((request, i) => { return (<RequestsCards key={i} request={request} user={this.props.user} />) })}
      </>
    );
  }
}

export default Requests;
