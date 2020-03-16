import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, Link } from "gatsby";
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import { slugify } from "../util/utilityFunctions";
import { DiscussionEmbed } from "disqus-react";
import authors from "../util/authors";

const SinglePost = ({ data, pageContext }) => {
  /// 여기서 data가 안뜨는 오류가 발생하는데 이 부분은 "resolutions": { "mdx-deck/**/gatsby": "2.18.4"} 로 해결.package
  const post = data.mdx.frontmatter;
  const author = authors?.find(x => x.name === post.author);
  const baseUrl = "https://gatsbytutorial.co.uk/";

  const discusShortname = "https-gatsbytutorial-co-uk";
  const discusConfig = {
    identifier: data.mdx.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  };
  return (
    <Layout
      pageTitle={post.title}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO title={post.title} />
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
      <h3 className="text-center">Share this post</h3>
      <div className="social-share-links text-center">
        <ul>
          <li>
            <a
              href={
                "https://www.facebook.com/sharer.php?u=" +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href={
                "https://twitter.com/share?url=" +
                baseUrl +
                pageContext.slug +
                "&text=" +
                post.title +
                "&via" +
                "twitterHandle"
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href={
                "https://plus.google.com/share?url=" +
                baseUrl +
                pageContext.slug
              }
              className="google"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.linkedin.com/shareArticle?url=" +
                baseUrl +
                pageContext.slug
              }
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed shortname={discusShortname} congif={discusConfig} />
    </Layout>
  );
};

export const postQuery = graphql`
  query blogPostByslug($slug: String!, $imageUrl: String!) {
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
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
export default SinglePost;
