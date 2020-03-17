import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import authors from "../util/authors";
import { Button, Card, CardText, CardBody, CardTitle, Row } from "reactstrap";
import JazzImage from "../images/jazz.png";
import JokerImage from "../images/joker.png";
import { slugify } from "../util/utilityFunctions";

const TeamPage = () => (
  <Layout pageTitl="Our team">
    <SEO title="Team" />
    <Row className="mb-4">
      <div className="col-md-3">
        <img src={JokerImage} style={{ maxWidth: "100%" }} alt="Joker's profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minWidth: "100%" }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[0].name)}`}>
              View Posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
    <Row className="mb-4">
      <div className="col-md-3">
        <img src={JazzImage} style={{ maxWidth: "100%" }} alt="Jazz's profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minWidth: "100%" }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[1].name)}`}>
              View Posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
);

export default TeamPage;
