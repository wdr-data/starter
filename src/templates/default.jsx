import React from "react";
import Helmet from "react-helmet";
import Config from "../../gatsby-config";

import Header from "../components/header/header.jsx";

import styles from "./default.module.css";
import "../css/defaults.css";
import "../css/colors.css";
import "../css/typography.css";
import Footer from "../components/footer/footer.jsx";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs.jsx";
import DateFormat from "../components/date/date.jsx";

const DefaultTemplate = (data) => {
  console.log(data);
  const URL = `https://data.wdr.de${Config.pathPrefix}/`
  const frontmatter = data.pageContext.frontmatter;
  const pub_date = new Date(Date.parse(frontmatter.pub_date+"T00:00:00.000Z"))
  console.log(frontmatter.pub_date, pub_date)

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": frontmatter.title,
    "image": `${URL}${frontmatter.heroImage}`,
    "datePublished": pub_date.toISOString(),
    "dateModified": pub_date.toISOString(),
    "author": frontmatter.author.split(',').map((author) => {
        return {
          "@type": "Person",
          "name": author
        }
    }),
    "publisher": {
      "@type": "Organization",
      "name": "WDR",
      "logo": {
        "@type": "ImageObject",
        "url": `${URL}wdr_logo.svg`
      }
    },
    "description": frontmatter.description
  }
  return (
    <>
      <Helmet title={frontmatter.title}>
        <meta name="description" content={frontmatter.description} />
        <meta name="image" content={URL + frontmatter.heroImage} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={URL + frontmatter.heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={"@WDR"} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={frontmatter.heroImage} />
        <script type="application/ld+json">{JSON.stringify(schema, null, 2)}</script>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.heroImage}>
          <Header heroImage={frontmatter.heroImage} heroAlt={frontmatter.heroAlt} heroCredit={frontmatter.heroCredit} />
        </div>
        <div className={styles.layout}>
          <Breadcrumbs>
            <a href="https://www1.wdr.de">WDR</a>
            <a href="/">Data</a>
            <a href="#top">{frontmatter.title}</a>
          </Breadcrumbs>
          <article className={styles.main}>
            <DateFormat date={pub_date} />
            {data.children}
          </article>
          <Breadcrumbs>
            <a href="https://www1.wdr.de">WDR</a>
            <a href="/">Data</a>
            <a href="#top">{frontmatter.title}</a>
          </Breadcrumbs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefaultTemplate;
