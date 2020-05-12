import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import DWChart from "react-datawrapper-chart";

import 'react-tabs/style/react-tabs.css';
import './react-tabs-style-overrides.css';

import styles from './TabbedView.module.css';

function Frame({ tab }) {
  return <DWChart className={styles.frame} src={tab.url} title={tab.frameTitle} aria-label={tab.ariaLabel} />
}

function TabbedView({ tabs, background = '#fff' }) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.app}>
      <Tabs className={styles.tabs} forceRenderTabPanel onSelect={(index) => setCurrentTab(index)}>
        <TabList>
          {
            tabs.map((tab, i) => <Tab key={i}>{tab.title}</Tab>)
          }
        </TabList>

        <div className={styles.panelContainer}>
          {
            tabs.map(
              (tab, i) =>
                <TabPanel
                  key={i}
                  className={classNames(styles.panel, i !== currentTab ? styles.panelOut : styles.panelSelected)}
                  style={{ background }}
                  aria-expanded={i === currentTab}>
                  <Frame tab={tab} />
                </TabPanel>
            )
          }
        </div>
      </Tabs>
    </div>
  );
}

export default TabbedView;
