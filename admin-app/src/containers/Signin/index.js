import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

const Signin = () => {
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Input
                  value=""
                  onChange={() => {}}
                  name="Email address"
                  type="email"
                  message="We'll never share your email with anyone else."
                />
                <Input
                  value=""
                  onChange={() => {}}
                  name="Password"
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

export default Signin;
