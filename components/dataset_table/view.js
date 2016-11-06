import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
import CheckboxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckboxOutlineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxIntermediateIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box';

import PopulationTable from './population_table';
import IndividualTable from './individual_table';

export default class DatasetTable extends React.Component {
    render() {
        let {
            samples,
            populations,
            isGroupedByPopulation,
            viewMode,
            searchString,
            toggleGroupByPopulation,
            toggleViewMode,
            selectSample,
            selectSamples,
            changeSearchString
        } = this.props;

        const viewModeIcon = [<CheckboxOutlineIcon/>, <CheckboxIntermediateIcon/>, <CheckboxIcon/>][viewMode];

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <div>&nbsp;</div>
                        <TextField
                            id="search"
                            placeholder="Search"
                            onChange={e => changeSearchString(e.target.value)}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton onClick={toggleViewMode}>
                            {viewModeIcon}
                        </IconButton>
                        <IconButton onClick={toggleGroupByPopulation}>
                            {
                                (isGroupedByPopulation)
                                    ? <PeopleIcon />
                                    : <PersonIcon />
                             }
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>

                {
                    (isGroupedByPopulation)
                        ? <PopulationTable populations={populations} />
                        : <IndividualTable
                            samples={samples}
                            selectSample={selectSample}
                            selectSamples={selectSamples}
                        />
                }
            </div>
        )
    }
}
