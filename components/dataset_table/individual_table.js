import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

const toolbarHeight = 104;
const TextCell = ({rowIndex, data, col}) => (
    <Cell>{data.getIn([rowIndex, col])}</Cell>
);
const CheckboxCell = ({rowIndex, data, col, onChange}) => {
    const id = data.getIn([rowIndex, col]);
    return (
        <div>
            <input
                type={"checkbox"}
                defaultChecked={data.getIn([rowIndex, "selected"])}
                onChange={() => onChange(data.getIn([rowIndex, "id"]))}
                key={id}
            />
            {id}
        </div>
    )
};

export default class PopulationTable extends React.Component {
    render() {
        const {
            samples,
            selectSample,
            selectSamples,
        } = this.props;

        return (
            <Table
                rowHeight={30}
                rowsCount={samples.size}
                width={window.innerWidth}
                height={window.innerHeight - toolbarHeight}
                headerHeight={30}
            >
                <Column
                    header={<Cell><input type={"checkbox"} onChange={e => {selectSamples(samples, e.target.checked)}/>Sample ID</Cell>}
                    cell={<CheckboxCell data={samples} col='id' onChange={selectSample}/>}
                    width={100}
                    fixed
                />
                <Column
                    header={<Cell>Sex</Cell>}
                    cell={<TextCell data={samples} col='sex' />}
                    width={50}
                />
                <Column
                    header={<Cell>Latitude</Cell>}
                    cell={<TextCell data={samples} col='lat' />}
                    width={120}
                />
                <Column
                    header={<Cell>Longitude</Cell>}
                    cell={<TextCell data={samples} col='lng' />}
                    width={120}
                />
                <Column
                    header={<Cell>Population</Cell>}
                    cell={<TextCell data={samples} col='population' />}
                    width={120}
                />
            </Table>
        )
    }
}
