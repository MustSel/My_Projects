import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AppointmentList = ({ appointments, setAppointments,consultedAppointments,setConsultedAppointments }) => {
  

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    const updatedConsultedAppointments = { ...consultedAppointments };
    delete updatedConsultedAppointments[index];
    setConsultedAppointments(updatedConsultedAppointments);
  };

  const handleDoubleClick = (index) => {
    setConsultedAppointments((prevConsultedAppointments) => ({
      ...prevConsultedAppointments,
      [index]: !prevConsultedAppointments[index],
    }));
   
  };

  return (
    <div className="d-flex flex-column rounded-4 border border-2 my-4">
      <h1 className="text-center text-success">Appointment List</h1>
      <div className="p-3">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <Row
              key={index}
              className={`bg-info rounded-4 m-2 p-2 position-relative ${consultedAppointments[index] ? 'border-start borderWidth border-success' : ''}`}
              onDoubleClick={() => handleDoubleClick(index)}
            >
              <Col className="text-start m-2 d-flex align-items-start justify-content-center flex-column position-relative">
                <h5>{appointment.patientName}</h5>
                <h6>{appointment.doctorName}</h6>
              </Col>
              <Col className="text-start d-flex align-items-start justify-content-center flex-column">
                <h6>
                  <span className="h5">Date:</span>{" "}
                  {appointment.date.slice(0, 10)}
                </h6>
                <h6>
                  <span className="h5">Time:</span>{" "}
                  {appointment.date.slice(11)}
                </h6>
              </Col>
              {consultedAppointments[index] && (
                <div className="position-absolute consulted top-50 start-50 translate-middle">
                  <span className="badge bg-success  m-auto">Consulted</span>
                </div>
              )}
              <Col
                xs={2}
                md={1}
                className="d-flex align-items-center justify-content-center"
              >
                <button
                  className="bg-danger"
                  onClick={() => handleDeleteAppointment(index)}
                >
                  Cancel
                </button>
              </Col>
            </Row>
          ))
        ) : (
          <div className="default-image-container">
            <img src="./img/appointment.jpg" width={400} alt="Default" />
            <p>No appointments available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
