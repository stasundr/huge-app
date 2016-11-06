import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

const toolbarHeight = 104;
const TextCell = ({rowIndex, data, col}) => (
    <Cell>{data.getIn([rowIndex, col])}</Cell>
);

export default class PopulationTable extends React.Component {
    render() {
        const {populations} = this.props;

        return (
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
        )
    }
}
