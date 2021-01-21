import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <div>
      <Layout>
        <Jumbotron className="text-center" style={{ margin: "5rem" }}>
          <h1>Welcome to Admin Dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quam
            est voluptates illum magni distinctio, nobis porro iusto minus
            pariatur sint. Harum, iusto omnis. Voluptas deleniti dignissimos
            odit commodi sapiente?
          </p>
        </Jumbotron>
      </Layout>
    </div>
  );
};

export default Home;
