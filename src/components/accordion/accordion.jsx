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
        <AccordionWrapper allowZeroExpanded>
            {[["Autor*innen", authors], ["Quellen", sources], ["Credits", credits]].map(([title, content]) => content && (
                <AccordionItem className={styles.item}>
                    <AccordionItemHeading className={styles.heading}>
                        <AccordionItemButton className={styles.button}>
                            <h3>{title}</h3>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={styles.panel}>
                        {content}
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </AccordionWrapper>
    );
}

const nodePropType = PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node));

Accordion.propTypes = {
    authors: nodePropType,
    sources: nodePropType,
    credits: nodePropType,
};

export default Accordion;
