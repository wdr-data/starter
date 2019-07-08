const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions

    const result = await graphql(
        `
        {
            allMdx {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    slug
                  }
                }
              }
            }
          }
        `)

    result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: '/',
            component: path.resolve(`./src/templates/default.jsx`),
            context: { id: node.id },
        })
    })
}
