import React from "react";

import Header from "../components/header/header.jsx";

import styles from "./default.module.css";
import "../css/defaults.css";
import "../css/colors.css";
import "../css/typography.css";
import Footer from "../components/footer/footer.jsx";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs.jsx";
import DateFormat from "../components/date/date.jsx";

const DefaultTemplate = data => {
  const frontmatter = data.pageContext.frontmatter;
  return (
    <>
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
            <DateFormat date={new Date(frontmatter.pub_date)} />
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
