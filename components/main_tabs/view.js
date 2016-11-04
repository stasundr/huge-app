import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import DatasetTable from '../dataset_table';
import AppGoogleMap from '../google_map';
import AnalysisPanel from '../analysis_panel';

class MainTabs extends React.Component {
    render() {
        const {
            selectTab,
            currentTab,
         } = this.props;

        return (
            <Tabs onChange={(tab) => selectTab(tab)} initialSelectedIndex={currentTab}>
                <Tab label="Dataset" value={0}><DatasetTable/></Tab>
                <Tab label="Map" value={1}><AppGoogleMap/></Tab>
                <Tab label="Analysis" value={2}><AnalysisPanel/></Tab>
                <Tab label="Share" value={3}>Pane-2</Tab>
            </Tabs>
        );
    }
}

export default MainTabs;
