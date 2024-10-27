import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
function Room({ room ,fromdate,todate}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs ">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 cd">
        <h1>{room.name}</h1>
        <p>Max Count : {room.maxcount}</p>
        <p>phonenumber : {room.phonenumber}</p>
        <p>type : {room.type}</p>
        <div style={{ float: "right" }}>
          {(fromdate && todate) && <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button type="button" className="btn btn-dark m-2">
              Book Now
            </button>
          </Link>}

          <button type="button" className="btn btn-dark" onClick={handleShow}>
            View Details
          </button>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel>
                {room.imageurls.map((element) => {
                  return (
                    <Carousel.Item>
                      {" "}
                      <img
                        src={element}
                        class="img-fluid rounded-top bigimg"
                        alt="room-img"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Modal.Body>
            <Modal.Footer>
              <p>{room.description}</p>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Room;
