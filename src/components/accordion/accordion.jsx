import React from "react";
import PropTypes from "prop-types";

import {
  Accordion as AccordionWrapper,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import styles from "./accordion.module.css";

const Accordion = ({ authors, sources, credits, hints }) => {
  return (
    <AccordionWrapper className={styles.wrapper} allowZeroExpanded>
      {[["AutorInnen", authors], ["Quellen", sources], ["Bildrechte & Credits", credits], ["Analytics & Fehler melden", hints]].map(
        ([title, content]) =>
          content && (
            <AccordionItem className={styles.item} key={title}>
              <AccordionItemHeading className={styles.heading}>
                <AccordionItemButton className={styles.button}>
                  <h4>{title}</h4>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.panel}>{content}</AccordionItemPanel>
            </AccordionItem>
          )
      )}
    </AccordionWrapper>
  );
};

const nodePropType = PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]);

Accordion.propTypes = {
  authors: nodePropType,
  sources: nodePropType,
  credits: nodePropType,
  hints: nodePropType,
};

export default Accordion;
