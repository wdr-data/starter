import React from "react";

import { pianoAnalytics } from "piano-analytics-js";

import FrontmatterContext from "../templates/frontmatterContext";

const isProduction =
  process.env.GATSBY_ATI_ENV === "production" ||
  process.env.GATSBY_WEBTREKK_ENV === "production";

const configTesting = {
  site: 621455,
  collectDomain: "https://logs1414.xiti.com",
};
const configProduction = {
  site: 624843,
  collectDomain: "https://ama.wdr.de",
};

if (isProduction) {
  pianoAnalytics.setConfigurations(configProduction);
} else {
  pianoAnalytics.setConfigurations(configTesting);
}

export const pageConfigFromFrontmatter = (frontmatter) => {
  return {
    pageTitle: frontmatter.title,
    datePublication: frontmatter.pub_date,
    ...frontmatter,
  };
};

export const usePageConfig = () => {
  const frontmatterContext = React.useContext(FrontmatterContext);
  return pageConfigFromFrontmatter(frontmatterContext);
};

export const sendEventPageDisplay = (pageConfig) => {
  pianoAnalytics.sendEvent("page.display", {
    "s:site_level2": "data.wdr.de",
    "s:brand": "WDR",
    "s:platform": "Web",
    "s:editorial_department": pageConfig.editorialDepartment,
    "s:page_type": pageConfig.pageType,
    "s:page_title": pageConfig.pageTitle,
    "s:page_chapter1": "Data-Starter",
    "s:page_chapter2": pageConfig.pageTitle,
    "s:page": `data.wdr.de_${pageConfig.pageType}_${pageConfig.pageTitle}`,
    "d:publication_time": pageConfig.datePublication,
    "d:last_editorial_update":
      pageConfig.dateLastEditorialUpdate || pageConfig.datePublication,
  });
};

export const sendEventClickAction = (
  pageConfig,
  { clickText, clickTarget },
) => {
  pianoAnalytics.sendEvent("click.action", {
    "s:click": clickText,
    "s:click_target": clickTarget || clickText,
    "s:click_chapter1": "Nutzereingabe",
    "s:click_chapter2": clickText,

    "s:site_level2": "data.wdr.de",
    "s:brand": "WDR",
    "s:platform": "Web",
    "s:editorial_department": pageConfig.editorialDepartment,
    "s:page_type": pageConfig.pageType,
    "s:page_title": pageConfig.pageTitle,
    "s:page_chapter1": "Data-Starter",
    "s:page_chapter2": pageConfig.pageTitle,
    "s:page": `data.wdr.de_${pageConfig.pageType}_${pageConfig.pageTitle}`,
    "d:publication_time": pageConfig.datePublication,
    "d:last_editorial_update":
      pageConfig.dateLastEditorialUpdate || pageConfig.datePublication,
  });
};
