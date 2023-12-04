import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [procurement, setProcurement] = useState(null);

  useEffect(() => {
    ajax("api/procurement", "GET", jwt).then((procurementData) => {
      console.log(procurementData);
      setProcurement(procurementData);
    });
  }, [jwt]);

  function createProcurement() {
    ajax("/api/procurement", "POST", jwt).then((procurementData) => {
      navigate(`/procurement/${procurementData.id}`);
    })
  }
  return (
    <div style={{ margin: "2em" }}>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <div className="mb-5">
        <Button size="lg" onClick={() => createProcurement()}>
          Submit New Procurement
        </Button>
      </div>
      {procurement ? (
        <div
        className="d-grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
      >
        {procurement.map((procurementData) => (
          // <Col>
          <Card
            key={procurementData.id}
            style={{ width: "20rem", height: "18rem" }}
          >
            <Card.Body className="d-flex flex-column justify-content-around">
            <Card.Title>Procurement #{procurementData.id}</Card.Title>
              <Card.Text style={{ marginTop: "1em" }}>
                <p>
                  <b>Name</b>: {procurementData.name}
                </p>
                <p>
                  <b>Description</b>: {procurementData.description}
                </p>
                <p>
                  <b>Price</b>: {procurementData.price}
                </p>
                <p>
                  <b>Quantity</b>: {procurementData.quantity}
                </p>
                <p>
                  <b>Purchase time</b>: {procurementData.purchaseTime}
                </p>
              </Card.Text>

              <Button
                variant="secondary"
                onClick={() => {
                  window.location.href = `/procurement/${procurementData.id}`;
                }}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
          // </Col>
        ))}
      </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;