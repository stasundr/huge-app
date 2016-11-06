import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import {Map, List} from 'immutable';

import People from 'material-ui/svg-icons/social/people';
import Person from 'material-ui/svg-icons/social/person';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CheckboxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckboxOutlineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckboxIntermediateIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';

const Immutable = require('immutable');
const toolbarHeight = 104;

export default class DatasetTable extends React.Component {
    render() {
        let {
            samples,
            isGroupedByPopulation,
            viewMode,
            searchString,
            toggleGroupByPopulation,
            toggleViewMode,
            selectSample,
            changeSearchString
        } = this.props;

        const sampleList = List(samples)
            .map(sample => sample[1]) // sample[0] - id, sample[1] - sample data
            .filter(sample => {
                switch(viewMode) {
                    case 0: return `${sample.get("id")} ${sample.get("population")}`.toLowerCase().match(searchString);
                    case 1: return sample.get("selected") || `${sample.get("id")} ${sample.get("population")}`.toLowerCase().match(searchString);
                    case 2: return sample.get("selected");
                }
            });

        const viewModeIcon = [<CheckboxOutlineIcon/>, <CheckboxIntermediateIcon/>, <CheckboxIcon/>][viewMode];

        const populations = Immutable.fromJS(sampleList.reduce((pops, sample) => {
            if (!pops.some(p => p.population == sample.get("population")))
                pops.push({
                    population: sample.get("population")
                });

            return pops;
        }, []));

        const TextCell = ({rowIndex, data, col}) => (
            <Cell>{data.get(rowIndex).get(col)}</Cell>
        );

        const CheckboxCell = ({rowIndex, data, col}) => {
            const id = data.get(rowIndex).get(col);
            return (
                <div>
                    <input
                        type={"checkbox"}
                        defaultChecked={data.get(rowIndex).get("selected")}
                        key={id}
                    />
                    {id}
                </div>
            )
        };

        const renderPopulationTable = () => (
            <Table
                rowHeight={30}
                rowsCount={populations.size}
                width={window.innerWidth}
                height={window.innerHeight - toolbarHeight}
                headerHeight={30}
            >
                <Column
                    header={<Cell>Population</Cell>}
                    cell={<TextCell data={populations} col='population' />}
                    width={100}
                    fixed
                />
            </Table>
        );

        const renderIndividualTable = () => {
            return (
                <Table
                    rowHeight={30}
                    rowsCount={sampleList.size}
                    width={window.innerWidth}
                    height={window.innerHeight - toolbarHeight}
                    headerHeight={30}
                    onRowClick={(e, rowId) => selectSample(sampleList.get(rowId).get("id"))}
                >
                    <Column
                        header={<Cell><input type={"checkbox"} onChange={() => console.log('yup')}/>Sample ID</Cell>}
                        cell={<CheckboxCell data={sampleList} col='id' />}
                        width={100}
                        fixed
                    />
                    <Column
                        header={<Cell>Sex</Cell>}
                        cell={<TextCell data={sampleList} col='sex' />}
                        width={50}
                    />
                    <Column
                        header={<Cell>Latitude</Cell>}
                        cell={<TextCell data={sampleList} col='lat' />}
                        width={120}
                    />
                    <Column
                        header={<Cell>Longitude</Cell>}
                        cell={<TextCell data={sampleList} col='lng' />}
                        width={120}
                    />
                    <Column
                        header={<Cell>Population</Cell>}
                        cell={<TextCell data={sampleList} col='population' />}
                        width={120}
                    />
                </Table>
            )
        };

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <TextField
                            id="search"
                            placeholder="Search"
                            onChange={e => changeSearchString(e.target.value)}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <AddBoxIcon />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton onClick={toggleViewMode}>
                            {viewModeIcon}
                        </IconButton>
                        <IconButton onClick={() => toggleGroupByPopulation(!isGroupedByPopulation)}>
                            {
                                (isGroupedByPopulation)
                                    ? <People />
                                    : <Person />
                             }
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>

                {
                    (isGroupedByPopulation)
                        ? renderPopulationTable()
                        : renderIndividualTable()
                }
            </div>
        )
    }
}
