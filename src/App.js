/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdCard,
  faHashtag,
  faSignature,
  faTag,
  faEnvelope,
  faPhone,
  faUserPlus,
  faHouse,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

function UserDetailsModal({ user, show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faIdCard} />
           Detalles de Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={5} className="text-right">
              <p>
                <FontAwesomeIcon icon={faHashtag} />
                 ID:{" "}
              </p>
              <p>
                <FontAwesomeIcon icon={faSignature} />
                 Nombre:
              </p>
              <p>
                <FontAwesomeIcon icon={faTag} />
                 Nombre de usuario:
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
                 Correo electrónico:
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />
                 Teléfono:
              </p>
            </Col>
            <Col md={5}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [showUserList, setShowUserList] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const handleCloseUserList = () => setShowUserList(false);
  const handleShowUserList = () => setShowUserList(true);

  const handleCloseUserDetails = () => setShowUserDetails(false);
  const handleShowUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
    setNewUser({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
    });
    setErrorMessages({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
    });
  };
  const handleShowAddUserModal = () => setShowAddUserModal(true);

  const handleSaveUser = () => {
    setErrorMessages({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
    });

    let hasError = false;

    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(newUser.id)) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        id: "El ID debe contener solo números.",
      }));
      hasError = true;
    }

    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    if (!nameRegex.test(newUser.name)) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        name: "El nombre debe contener solo letras y tener máximo 30 caracteres.",
      }));
      hasError = true;
    }

    const usernameRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{1,10}$/;
    if (!usernameRegex.test(newUser.username)) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        username:
          "El nombre de usuario debe contener al menos un carácter especial, una mayúscula y tener máximo 10 caracteres.",
      }));
      hasError = true;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(newUser.email)) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        email: "Por favor, ingresa un correo electrónico válido.",
      }));
      hasError = true;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(newUser.phone)) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        phone: "El teléfono debe contener exactamente 10 números.",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    alert(
      `Nuevo usuario:\nID: ${newUser.id}\nNombre: ${newUser.name}\nNombre de usuario: ${newUser.username}\nCorreo electrónico: ${newUser.email}\nTeléfono: ${newUser.phone}`
    );
    handleCloseAddUserModal();
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <p className="titulo">
          <FontAwesomeIcon icon={faHouse} />
           Inicio
        </p>
        <a className="App-link" onClick={handleShowUserList}>
          <FontAwesomeIcon icon={faUser} />
           Usuarios
        </a>
        {/* Modal for users */}
        <Modal size="xl" show={showUserList} onHide={handleCloseUserList}>
          <Modal.Header closeButton>
            <Modal.Title>Usuarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center justify-content-between">
              <Button variant="primary" onClick={handleShowAddUserModal}>
                Agregar Usuarios 
                <FontAwesomeIcon icon={faUserPlus} />
              </Button>
              <div> </div>
              <ListGroup defaultActiveKey="#link1" className="flex-fill">
                {users.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    onClick={() => handleShowUserDetails(user)}
                  >
                    <FontAwesomeIcon icon={faUser} /> {user.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUserList}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for user details */}
        <UserDetailsModal
          user={selectedUser}
          show={showUserDetails}
          onClose={handleCloseUserDetails}
        />

        {/* Modal for adding new user */}
        <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon={faUserPlus} />
               Agregar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="userId">
                <Form.Label>
                  <FontAwesomeIcon icon={faHashtag} />
                   ID
                </Form.Label>
                <Form.Control
                  type="text"
                  value={newUser.id}
                  onChange={(e) =>
                    setNewUser({ ...newUser, id: e.target.value })
                  }
                />
                {errorMessages.id && (
                  <Form.Text className="text-danger">
                    {errorMessages.id}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>
                  <FontAwesomeIcon icon={faSignature} />
                   Nombre
                </Form.Label>
                <Form.Control
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                {errorMessages.name && (
                  <Form.Text className="text-danger">
                    {errorMessages.name}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="userUsername">
                <Form.Label>
                  <FontAwesomeIcon icon={faTag} />
                   Nombre de Usuario
                </Form.Label>
                <Form.Control
                  type="text"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
                {errorMessages.username && (
                  <Form.Text className="text-danger">
                    {errorMessages.username}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="userEmail">
                <Form.Label>
                  <FontAwesomeIcon icon={faEnvelope} />
                   Correo Electrónico
                </Form.Label>
                <Form.Control
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                {errorMessages.email && (
                  <Form.Text className="text-danger">
                    {errorMessages.email}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="userPhone">
                <Form.Label>
                  <FontAwesomeIcon icon={faPhone} />
                   Teléfono
                </Form.Label>
                <Form.Control
                  type="text"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
                {errorMessages.phone && (
                  <Form.Text className="text-danger">
                    {errorMessages.phone}
                  </Form.Text>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddUserModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveUser}>
              Guardar Usuario 
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
