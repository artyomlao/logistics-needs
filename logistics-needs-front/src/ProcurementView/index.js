import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Form, Row,} from "react-bootstrap";
import ajax from "../Services/fetchService";
import CreatableSelect from 'react-select/creatable';

import {useLocalState} from "../util/useLocalStorage";

const ProcurementView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const procurementId = window.location.href.split("/procurement/")[1];
    const [procurement, setProcurement] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        userId: 1,
        status: ''
    });

    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    function updateProcurement(prop, value) {
        const newProcurement = {...procurement};
        newProcurement[prop] = value;
        setProcurement(newProcurement);
    }

    function save() {
        procurement.status = selectedValue;
        procurement.documents = selectedOptions.map(documentData => documentData.value);
        ajax(`/api/procurement/${procurementId}`, "PUT", jwt, procurement).then(
            (procurementData) => {
                procurementData.status = selectedValue;
                setProcurement(procurementData);
                window.location.href = '/dashboard'
            });
    }

    useEffect(() => {
        ajax(`/api/procurement/${procurementId}`, "GET", jwt).then(
            (procurementData) => {
                if (procurementData.name === null) procurementData.name = "";
                if (procurementData.description === null) procurementData.description = "";
                if (procurementData.price === null) procurementData.description = 0;
                if (procurementData.quantity === null) procurementData.quantity = 0;
                const options = procurementData.documents.map((document) => ({
                    value: document.name,
                    label: document.name
                }))
                setOptions(options);
                setSelectedOptions(options);
                setSelectedValue(procurementData.status)
                setProcurement(procurementData);
            });
    }, []);

    const handleCreate = (inputValue) => {
        const newOption = {
            value: inputValue,
            label: inputValue,
        };

        setOptions([...options, newOption]);
        setSelectedOptions([...options, newOption]);
    };

    const handleChange = (value, actionMeta) => {
        let index = options.indexOf(actionMeta.removedValue);
        options.splice(index, 1);
        setSelectedOptions([...options])
    };

    let STATUSES = ["Processing order", "Delivery", "At the post office",
        "From the post office to the stock", "Stock processing", "In production"]; // convert to name-value with constants names

    function handleStatusChange(statusSelect) {
        setSelectedValue(statusSelect.target.value);
    }

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    <h1>Procurement {procurementId} </h1>
                </Col>
            </Row>
            {procurement ? (
                <>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Procurement Status:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control as="select" value={selectedValue} onChange={handleStatusChange}>
                                {
                                    STATUSES.map((procurementStatus) => (
                                        <option key={procurementStatus} value={procurementStatus}>
                                            {procurementStatus}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Name:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="name"
                                onChange={(e) => updateProcurement("name", e.target.value)}
                                type="text"
                                value={procurement.name}
                                placeholder="Кран строительный"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" md="2">
                            Description:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="description"
                                type="text"
                                placeholder="Description"
                                onChange={(e) => updateProcurement("description", e.target.value)}
                                value={procurement.branch}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Price:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="price"
                                onChange={(e) => updateProcurement("price", e.target.value)}
                                type="number"
                                value={procurement.price}
                                placeholder="37"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Quantity:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="quantity"
                                onChange={(e) => updateProcurement("quantity", e.target.value)}
                                type="number"
                                value={procurement.quantity}
                                placeholder="3"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label column sm="3" md="2">
                            Documents:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <CreatableSelect
                                id="documents"
                                options={options}
                                isMulti
                                onChange={handleChange}
                                onCreateOption={handleCreate}
                                value={selectedOptions}
                            />
                        </Col>
                    </Form.Group>

                    <div className="d-flex gap-5">
                        <Button size="lg" onClick={() => save()}>
                            Submit Procurement
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => (window.location.href = "/dashboard")}
                        >
                            Back
                        </Button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default ProcurementView;