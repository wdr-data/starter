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
import Accordion from "../components/accordion/accordion.jsx";

const DefaultTemplate = data => {
  const URL = `https://data.wdr.de${Config.pathPrefix}/`;
  const frontmatter = data.pageContext.frontmatter;
  const pub_date = new Date(Date.parse(frontmatter.pub_date + "T00:00:00.000Z"));

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    headline: frontmatter.title,
    image: `${URL}${frontmatter.heroImage}`,
    datePublished: pub_date.toISOString(),
    dateModified: pub_date.toISOString(),
    author: frontmatter.author.split(",").map(author => {
      return {
        "@type": "Person",
        name: author
      };
    }),
    publisher: {
      "@type": "Organization",
      name: "WDR",
      logo: {
        "@type": "ImageObject",
        url: `${URL}wdr_logo.svg`
      }
    },
    description: frontmatter.description
  };
  return (
    <>
      <Helmet title={frontmatter.title}>
        <meta name="description" content={frontmatter.description} />
        <meta name="image" content={URL + frontmatter.heroImage} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={URL + frontmatter.sharingImageFacebook} />
        <meta property="og:image-width" content="1200" />
        <meta property="og:image-height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={"@WDR"} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={URL + frontmatter.sharingImageTwitter} />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#12365e" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <script type="application/ld+json">{JSON.stringify(schema, null, 2)}</script>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.heroImage}>
          <Header heroImage={frontmatter.heroImage} heroAlt={frontmatter.heroAlt} heroCredit={frontmatter.heroCredit} />
        </div>
        <div className={styles.layout}>
          <Breadcrumbs>
            <a href="https://www1.wdr.de">WDR</a>
            <a href="https://data.wdr.de">Data</a>
            <a href="#top">{frontmatter.title}</a>
          </Breadcrumbs>
          <article className={styles.main}>
            <DateFormat date={pub_date} />
            {data.children}
            <Accordion
              authors={
                <ul>
                  <li>
                    <a href="https://twitter.com/TheOrganicer" target="_blank" rel="noopener noreferrer">
                      Niklas Rudolph
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/pen1710" target="_blank" rel="noopener noreferrer">
                      Patricia Ennenbach
                    </a>
                  </li>
                </ul>
              }
              sources={
                <React.Fragment>
                  <h3>Daten</h3>
                  <ul>
                    <li>
                      - WDR Umfrage und eigene Recherchen - Daten zum Download:{" "}
                      <a
                        href="https://raw.githubusercontent.com/wdr-data/starter/main/data/opern_nrw_18_19.csv"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        opern_nrw_18_19.csv
                      </a>
                    </li>
                    <li>
                      - Per{" "}
                      <a href="https://query.wikidata.org/" target="_blank" rel="noopener noreferrer">
                        Wikidata Query Service{" "}
                      </a>
                      abgerufene Lebensdaten - Daten zum Download:{" "}
                      <a
                        href="https://raw.githubusercontent.com/wdr-data/starter/main/data/komponisten_wikidata.csv"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Komponistinnen_wikidata.csv
                      </a>
                    </li>
                    <li>
                      - Die Vorgehensweise bei der Datenanalyse können Sie hier nachlesen:{" "}
                      <a
                        href="https://github.com/wdr-data/starter/blob/main/data/Daten-Analyse_Opern_in_NRW.ipynb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Daten-Analyse Opern in NRW
                      </a>
                    </li>
                  </ul>
                  <h3>Code</h3>
                  <ul>
                    <li>
                      - 'Oper in NRW' ist das erste WDR Data Projekt, das mit unserem Data Starter umgesetzt wurde. Der
                      Code steht OpenSource zur Verfügung:{" "}
                      <a href="https://github.com/wdr-data/starter/" target="_blank" rel="noopener noreferrer">
                        WDR Data Starter
                      </a>
                    </li>
                  </ul>
                </React.Fragment>
              }
              credits={
                <React.Fragment>
                  <h3>Bildrechte:</h3>
                  <ul>
                    <li>
                      Aufmacher-Bild: Richard Wagner und seine Freunde, Foto von Joseph Albert (picture alliance /
                      akg-images)
                    </li>
                    <li>Bild 2: Der Wuppertaler Opernintendant Berthold Schneider, fotografiert von Jens Grossmann</li>
                  </ul>
                  <h3>Credits:</h3>
                  <ul>
                    <li>
                      <b>Redaktion</b>: Niklas Rudolph, Urs Zietan, Jutta Starke
                    </li>
                    <li>
                      <b>Design</b>: Chrissi Holderbaum, Dilek Wache
                    </li>
                    <li>
                      <b>Programmierung</b>: Christine Gotthardt, Marcus Weiner, Jakob Holderbaum, Patricia Ennenbach
                    </li>
                    <li>
                      <b>Accessability, UX</b>: Dilek Wache, Stephanie Juranek
                    </li>
                    <li>
                      <b>Datenrecherche</b>: Felix Buczek, Hannah Schmidt, Anne Glaser, Robert Haase, Greta Hey, Inge
                      Akyaa, Katharina Riethmüller
                    </li>
                    <li>
                      <b>Besondere Unterstützung:</b> Dr. Olaf Roth, Musiktheater im Revier
                    </li>
                  </ul>
                </React.Fragment>
              }
              hints={
                <React.Fragment>
                  <h3>Analytics</h3>
                  <p>
                    Diese Seite verwendet Webtrekk, um Daten über das Interaktions- und Nutzungsverhalten zu sammeln.
                    Diese Daten werden auf Seiten des WDR ausschliesslich in anonymisierter Form gespeichert und
                    ausgewertet.
                  </p>
                  <h3>Fehler melden</h3>
                  <p>Für Hinweise und die Meldung von Fehlern schreiben Sie uns an data@wdr.de.</p>
                </React.Fragment>
              }
            />
          </article>
          <Breadcrumbs>
            <a href="https://www1.wdr.de">WDR</a>
            <a href="https://www1.wdr.de/verbraucher/digital/data/index.html">Data</a>
            <a href="#top">{frontmatter.title}</a>
          </Breadcrumbs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefaultTemplate;
