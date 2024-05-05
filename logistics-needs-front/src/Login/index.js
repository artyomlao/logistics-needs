import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    const reqBody = {
      email: email,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(body.token);
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }
  return (
    <>
      <Container className="mt-5 ">
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fs-4">E-mail</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="joe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Type in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              type="button"
              size="lg"
              onClick={() => {
                window.location.href = "/registration";
              }}
            >
              Registration
            </Button>
            <Button
              type="button"
              size="lg"
              className="btn-primary"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
      </>
  );
};

export default Login;