import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

const IndexPage = () => (
  <Layout pageTitle="Code Blog">
    <SEO title="Home" />
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMdx.edges.map(({ node }) => (
              <Post
                key={node.id}
                title={node.frontmatter.title}
                author={node.frontmatter.author}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                body={node.excerpt}
                fluid={node.frontmatter.image.childImageSharp.fluid}
                tags={node.frontmatter.tags}
              />
            ))}
          </div>
        )
      }}
    />
  </Layout>
)

const indexQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
          }
          fields {
            slug
          }
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`

export default IndexPage
