import React from "react";
import Layout from "../components/layout";
import Post from "../components/Post";
import { graphql } from "gatsby";
import authors from "../util/authors";

const authorPost = ({ data, pageContext }) => {
  const { totalCount } = data.allMdx;
  const author = authors.find(x => x.name === pageContext.authorName);
  const pageHeader = `${totalCount} Posts by ${pageContext.authorName}`;

  return (
    <Layout pageTitle={pageHeader} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      {data.allMdx.edges.map(({ node }) => (
        <Post
          key={node.id}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          body={node.excerpt}
          fluid={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
    </Layout>
  );
};

export const authorQuery = graphql`
  query($authorName: String!, $imageUrl: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 650) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default authorPost;
