import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { Badge, Row, Col, Card, CardBody, CardSubtitle } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"
import Sidebar from "../components/Sidebar"

const SinglePost = ({ data }) => {
  const post = data.mdx.frontmatter
  console.log(data.mdx)
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">{post.date}</span> by{" "}
                <span className="text-info">{post.author}</span>
              </CardSubtitle>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
              <ul className="post-tags">
                {post.tags.map(tag => (
                  <li key={tag}>
                    <Link to={`/tag/${slugify(tag)}`}>
                      <Badge color="primary">{tag}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col className="md-4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostByslug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 20)
      body
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
export default SinglePost
