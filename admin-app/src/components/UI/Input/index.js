import React from "react";
import { Form } from "react-bootstrap";

const input = ({ name, type, value, onChange, message }) => {
  return (
    <>
      <Form.Group controlId="formBasic">
        <Form.Label>{name}</Form.Label>
        <Form.Control
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Enter Your ${name}`}
        />
        <Form.Text className="text-muted">{message}</Form.Text>
      </Form.Group>
    </>
  );
};

export default input;
