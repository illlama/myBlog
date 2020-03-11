import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Input,
  CardText,
} from "reactstrap";
import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

const Sidebar = ({ postAuthor, authorImageFluid }) => (
  <div>
    {postAuthor && (
      <Card>
        <Img className="card-image-top" fluid={authorImageFluid} />
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            {postAuthor.name}
          </CardTitle>
          <CardText>{postAuthor.bio}</CardText>
          <div className="author-social-links text-center">
            <ul>
              <li>
                <a
                  href={postAuthor.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <i className="fab fa-facebook-f fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  href={postAuthor.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  href={postAuthor.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  href={postAuthor.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google"
                >
                  <i className="fab fa-google fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  href={postAuthor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    )}
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase md-3">
          Newsletter
        </CardTitle>
        <Form className="text-center">
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your email adress ..."
            />
          </FormGroup>
          <button className="btn btn-outline-success text-uppercase">
            Subscribe
          </button>
        </Form>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase">
          Advertisement
        </CardTitle>
        <img
          src="https://via.placeholder.com/320x200"
          alt="Advert"
          style={{ width: "100%" }}
        />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase md-3">
          Recent Posts
        </CardTitle>
        <StaticQuery
          query={sidebarQuery}
          render={data => (
            <div>
              {data.allMdx.edges.map(({ node }) => (
                <Card key={node.id}>
                  <Link to={node.fields.slug}>
                    <Img
                      className="card-image-top"
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        />
      </CardBody>
    </Card>
  </div>
);

const sidebarQuery = graphql`
  query sidebarQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Sidebar;
