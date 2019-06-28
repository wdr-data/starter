import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import Header from '../components/header/header.jsx';

import styles from './default.module.css';
import '../css/defaults.css';
import '../css/colors.css';
import '../css/typography.css';
import Footer from "../components/footer/footer.jsx";

const DefaultTemplate = ({ data: { mdx } }) => {
  return (
    <>
      <Header
        heroImage={mdx.frontmatter.heroImage.publicURL}
        heroAlt={mdx.frontmatter.heroAlt}
        heroCredit={mdx.frontmatter.heroCredit}
      />
      <article className={styles.main}>
        <MDXRenderer>{mdx.code.body}</MDXRenderer>
      </article>
      <Footer/>
    </>
  )
}

export const pageQuery = graphql`
  query DefaultQuery($id: String) {
    mdx(id: {eq: $id}) {
      id
      frontmatter {
        title
        heroImage {
          publicURL
        }
        heroAlt
        heroCredit
      }
      code {
        body
      }
    }
  }
`
export default DefaultTemplate;