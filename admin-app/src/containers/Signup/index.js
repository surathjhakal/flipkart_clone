import React from "react";
import Layout from "../../components/Layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/UI/Input";

const Signup = () => {
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      value=""
                      onChange={() => {}}
                      name="First Name"
                      type="text"
                      message=""
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      value=""
                      onChange={() => {}}
                      name="Last Name"
                      type="text"
                      message=""
                    />
                  </Col>
                </Row>
                <Input
                  value=""
                  onChange={() => {}}
                  name="Email address"
                  type="email"
                  message=""
                />
                <Input
                  value=""
                  onChange={() => {}}
                  name="Password"
                  type="password"
                  message=""
                />
                <Input
                  value=""
                  onChange={() => {}}
                  name="Confirm Password"
                  type="password"
                  message=""
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Signup;
