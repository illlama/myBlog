import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Header from "./header";
import "../styles/index.scss";
import { Row, Col } from "reactstrap";

const Layout = ({ children, pageTitle, postAuthor, authorImageFluid }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <script
        src="https://kit.fontawesome.com/45fe5e32d0.js"
        crossorigin="anonymous"
      ></script>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container" id="content">
        <h1>{pageTitle}</h1>
        <Row>
          <Col md="8">{children}</Col>
          <Col md="4">
            <Sidebar
              postAuthor={postAuthor}
              authorImageFluid={authorImageFluid}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
