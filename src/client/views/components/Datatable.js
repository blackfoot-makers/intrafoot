import React from 'react';
import { array, bool, arrayOf, shape, string } from 'prop-types';
import { DataTable, TableHeader } from 'react-mdl';

const CustomDataTable = ({ rows, numeric, titles, isPrice }) =>
  <DataTable rows={rows}>
    {Object.keys(rows[0]).map((value, index) => {
      const title = titles[index].title;
      return (
        <TableHeader
          key={`${value}${index}`}
          numeric={numeric && title !== 'Type'}
          cellFormatter={price =>
            isPrice && title !== 'Type' ? `${price.toFixed(2)}€` : price}
          name={value}
          tooltip={titles[index].tooltip}
        >
          {title}
        </TableHeader>
      );
    })}
  </DataTable>;

CustomDataTable.defaultProps = {
  numeric: true,
  isPrice: true
};

CustomDataTable.propTypes = {
  rows: array.isRequired,
  titles: arrayOf(
    shape({
      title: string.isRequired,
      tooltip: string
    })
  ).isRequired,
  numeric: bool,
  isPrice: bool
};

export default CustomDataTable;
