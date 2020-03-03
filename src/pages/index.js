import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <Row>
      <Col md="8">
        <StaticQuery
          query={indexQuery}
          render={data => {
            return (
              <div>
                {data.allMdx.edges.map(({ node }) => (
                  <Post
                    key={node.frontmatter.key}
                    title={node.frontmatter.title}
                    author={node.frontmatter.author}
                    path={node.frontmatter.path}
                    date={node.frontmatter.date}
                    body={node.excerpt}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                ))}
              </div>
            )
          }}
        />
      </Col>
      <Col md="4">
        <div style={{ width: "100%", height: "100%", backgroundColor: "#ddd" }}>
          ""
        </div>
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            key
            title
            date(formatString: "MMMM DD, YYYY")
            author
            path
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
