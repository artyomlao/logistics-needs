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
      setProcurement(procurementData);
    });
  }, [jwt]);

  function createProcurement() {
    ajax("/api/procurement", "POST", jwt).then((procurementData) => {
      navigate(`/procurement/${procurementData.id}`);
    })
  }

  return (
      <div className="procurement-dashboard">
        <div className="mb-5">
          <Button size="lg" className="submit-btn" onClick={() => createProcurement()}>
            Submit New Procurement
          </Button>
        </div>
        {procurement ? (
            <div className="d-grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
              {procurement.map((procurementData) => (
                  <Card key={procurementData.id} className="procurement-card">
                    <Card.Body className="procurement-details">
                      <Card.Title className="text-light">Procurement #{procurementData.id}</Card.Title>
                      <Card.Text className="card-text">
                        <p className="text-light"><b className="text-light">Name</b>: {procurementData.name}</p>
                        <p className="text-light"><b className="text-light">Description</b>: {procurementData.description}</p>
                        <p className="text-light"><b className="text-light">Price</b>: {procurementData.price}</p>
                        <p className="text-light"><b className="text-light">Status</b>: {procurementData.status}</p>
                        <p className="text-light"><b className="text-light">Quantity</b>: {procurementData.quantity}</p>
                        <p className="text-light"><b className="text-light">Purchase time</b>: {procurementData.purchaseTime}</p>
                      </Card.Text>
                      <Button variant="secondary" className="edit-btn bg-light text-dark" onClick={() => { window.location.href = `/procurement/${procurementData.id}`; }}>
                        Edit
                      </Button>
                    </Card.Body>
                  </Card>
              ))}
            </div>
        ) : (
            <></>
        )}
      </div>
  );
};

export default Dashboard;