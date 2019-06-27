import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import Header from '../components/header/header.jsx';

import '../css/defaults.css';
import '../css/colors.css';
import '../css/typography.css';

const DefaultTemplate = ({ data: { mdx } }) => {
  return (
    <>
      <Header />
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </>
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