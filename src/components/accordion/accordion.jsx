import React from 'react';
import PropTypes from 'prop-types';

import {
    Accordion as AccordionWrapper,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import styles from './accordion.module.css';

const Accordion = ({ authors, sources, credits }) => {
    return (
        <AccordionWrapper allowZeroExpanded='true' className={styles.accordionWrapper}>
            {authors && <AccordionItem className={styles.accordionItem}>
                <AccordionItemHeading className={styles.accordionHeading}>
                    <AccordionItemButton className={styles.accordionButton}>
                        <h3>Author*innen</h3>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={styles.accordionPanel}>
                    {authors}
                </AccordionItemPanel>
            </AccordionItem>}
            {sources && <AccordionItem className={styles.accordionItem}>
                <AccordionItemHeading className={styles.accordionHeading}>
                    <AccordionItemButton className={styles.accordionButton}>
                        <h3>Quellen</h3>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={styles.accordionPanel}>
                    {sources}
                </AccordionItemPanel>
            </AccordionItem>}
            {credits && <AccordionItem className={styles.accordionItem}>
                <AccordionItemHeading className={styles.accordionHeading}>
                    <AccordionItemButton className={styles.accordionButton}>
                        <h3>Credits</h3>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={styles.accordionPanel}>
                    {credits}
                </AccordionItemPanel>
            </AccordionItem>}
        </AccordionWrapper>
    );
}

Accordion.propTypes = {
    authors: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
    sources: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
    credits: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
};

export default Accordion;
