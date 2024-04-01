import React from "react";
import Col from "react-bootstrap/Col";

const Doctors = ({ doctor, show }) => {
  const { name, dep, img } = doctor;

  return (
    <Col>
      <img
        className="doctorCard my-3 rounded-3"
        onClick={() => show(doctor)}
        src={img}
        alt={name}
        width="80%"
        style={{ cursor: "pointer" }}
      />
      <h5>{name}</h5>
      <p>{dep}</p>
    </Col>
  );
};

export default Doctors;
