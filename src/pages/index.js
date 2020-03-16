import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/Post";
import { graphql, StaticQuery } from "gatsby";
import PaginationLinks from "../components/PaginationLinks";

const IndexPage = () => {
  const postsPerPage = 2;
  let numberOfPages;
  return (
    <Layout pageTitle="Code Blog">
      <SEO title="Home" />
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(data.allMdx.totalCount / postsPerPage);
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
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          );
        }}
      />
    </Layout>
  );
};

const indexQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 2) {
      totalCount
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
`;

export default IndexPage;
