import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import { graphql, StaticQuery } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <StaticQuery
      query={indexQuery}
      render={data => {
        console.log()
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
          frontmatter {
            key
            title
            date(formatString: "MMMM DD, YYYY")
            author
            path
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
