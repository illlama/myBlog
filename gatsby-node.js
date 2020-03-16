const { slugify } = require("./src/util/utilityFunctions");
const authors = require("./src/util/authors");
const path = require("path");
const _ = require("lodash");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPost: path.resolve("src/templates/tags-page.js"),
  };
  return graphql(`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const posts = res.data.allMdx.edges;
    ///create single blogpost pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          //Passing slug for template to use to get post
          slug: node.fields.slug,
          //Find author imageUrl from authors and pass it to the single post template
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      });
    });

    let tags = [];
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    let tagPostCounts = {};
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
    });
    tags = _.uniq(tags);
    createPage({
      path: `/tags`,
      component: templates.tagsPost,
      context: {
        tags,
        tagPostCounts,
      },
    });
  });
};
