import React, { Component } from "react";
import PropTypes from "prop-types";

import TableAdapter from "../../adapters/TableAdapter";
import SlotCell from "./SlotCell";

import TableHeadComponent from "../../adapters/TableHeadAdapter";
import TableRowComponent from "../../adapters/TableRowAdapter";

import HIGChildValidator from "../../elements/HIGChildValidator";

const TableHead = TableAdapter.TableHead;
const TableRow = TableAdapter.TableRow;
const TextHeadCell = TableAdapter.TableHead.TextHeadCell;
const TextCell = TableAdapter.TableRow.TextCell;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    columns: [],
    data: []
  };

  render() {
    return (
      <TableAdapter density={this.props.density}>
        <TableHead>
          {this.props.columns.map(column => (
            <TextHeadCell
              text={column.Header}
              alignment={column.alignment}
              width={column.width}
              key={column.id}
            />
          ))}
        </TableHead>
        {this.props.data.map(row => (
          <TableRow key={row['accessor']}>
            {this.props.columns.map(column => (
              getCell({ column, data: row })
            ))}
          </TableRow>
        ))}
      </TableAdapter> 
    );
  }
}

Table.propTypes = {
  density: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  children: HIGChildValidator([TableHeadComponent, TableRowComponent])
}

Table.__docgenInfo = {
  props: {
    density: {
      description: "sets the size of the table"
    },
    columns: {
      description: "provides content for header cells"
    },

    data: {
      description: "provides content table cells"
    }
  }
}

export default Table;

function getCell(props) {
  let content;
  switch (typeof props.column.accessor) {
    case "function": {
      content = props.column.accessor(props.data);
      break;
    }
    default: {
      content = props.data[props.column.accessor];
    }
  }

  if (props.column.Cell) {
    return <SlotCell><props.column.Cell {...props} /></SlotCell>
  } else {
    return <TextCell text={content}  />;
  }
}
