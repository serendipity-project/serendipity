import React, { Component } from "react";
import RequestsCards from "./RequestsCards";
import RequestService from "../../services/request-service";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import LeftArrow from "react-icons/lib/fa/angle-left";
import RightArrow from "react-icons/lib/fa/angle-right";
import "pure-react-carousel/dist/react-carousel.es.css";
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
        <div className='request-cards'>
          <CarouselProvider
            naturalSlideWidth={150}
            naturalSlideHeight={280}
            visibleSlides={2}
            totalSlides={listOfRequests.length}
          >
            <ButtonBack className='arrows'>
              <LeftArrow className='arrow-icon' />
            </ButtonBack>
            <ButtonNext className='arrows'><RightArrow className='arrow-icon' /></ButtonNext>
            <Slider>
              {listOfRequests.length > 0 ?
                (
                  listOfRequests.map((request, i) => {
                    return (
                      <Slide>
                        <RequestsCards key={i} update={(e) => this.getAll(e)} request={request} user={this.props.user} />
                      </Slide>
                    )
                  })

                ) : (
                  <h3 style={{ margin: "4%" }}>You don't have any requests for the moment! </h3>
                )}
            </Slider>
          </CarouselProvider>
        </div>
      </>
    );
  }
}

export default Requests;
