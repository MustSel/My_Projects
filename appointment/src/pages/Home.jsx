import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Doctors from "../components/Doctors";
import { doctorData } from "../helpers/data";
import AddModal from "../components/AddModal";
import AppointmentList from "../components/AppointmentList";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([])
  const [consultedAppointments, setConsultedAppointments] = useState({});

// Yerel depolamadan randevuları al
useEffect(() => {
  const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
  if (storedAppointments) {
    setAppointments(storedAppointments);
  }

  const storedConsultedAppointments = JSON.parse(localStorage.getItem("consultedAppointments"));
  if (storedConsultedAppointments) {
    setConsultedAppointments(storedConsultedAppointments);
  }
}, []);

// Randevuları yerel depolamaya kaydet
useEffect(() => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}, [appointments]);

// Consulted durumunu yerel depolamaya kaydet
useEffect(() => {
  localStorage.setItem("consultedAppointments", JSON.stringify(consultedAppointments));
}, [consultedAppointments]);




console.log(appointments)
  const handleShowModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Container className="text-center">
      <h1>SELCUK HASTANESİ</h1>
      <h2>OUR DOCTORS</h2>
      <Row xs={1} md={2} lg={3} xl={4}>
        {doctorData.map((doctor) => (
          <Doctors key={doctor.id} doctor={doctor} show={handleShowModal} />
        ))}
      </Row>

      <AddModal
        show={show}
        handleClose={handleCloseModal}
        {...selectedDoctor}
        setAppointments={setAppointments}
        appointments={appointments}
      />
      <AppointmentList appointments={appointments} setAppointments={setAppointments} consultedAppointments={consultedAppointments} setConsultedAppointments={setConsultedAppointments} />
    </Container>
  );
};

export default Home;