import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

const DefaultTemplate = ({ data: { mdx } }) => {
    return (
        <MDXRenderer>{mdx.code.body}</MDXRenderer>
    )
}

export const pageQuery = graphql`
  query DefaultQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
export default DefaultTemplate;