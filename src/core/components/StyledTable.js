import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

const StyledTable = ({ columns, rows, maxWidth }) => {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);

  console.log(columns)
  console.log(rows)

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //   console.log(rows);

  const headers = columns.map((col, index) => {
    console.log(col.id + ' col')
    return (
      <TableCell key={col.id} id={col.id} align="right">
        {col.label}
      </TableCell>
    );
  });

  const columnData = (
    <TableHead>
      <TableRow>{headers}</TableRow>
    </TableHead>
  );

  const mappedRows = visibleRows.map((row, index) => {
    // const isItemSelected = isSelected(row.name);
    // const labelId = `enhanced-table-checkbox-${index}`;
    const keys = Object.keys(row);
    var data = [];
    console.log(keys);
    console.log(row.id);
    return (
      <TableRow
        hover
        // onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        // aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        // selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        {/* <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell> */}
        {keys.forEach((key, index) => {
          //   console.log(`${key}: ${row[key]}`);
          // console.log(row[key]);
          console.log(key + ' row');

          data.push(<TableCell key={index} align="right">{JSON.stringify(row[key])}</TableCell>);
        })}
        {data}
        {/* <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
            >
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
    );
  });

  const rowData = <TableBody>{mappedRows}</TableBody>

  return (
    <Paper sx={{ maxWidth: maxWidth ? maxWidth : 700 }}>
      <TableContainer>
        <Table
          sx={{ maxWidth: maxWidth ? maxWidth : 700 }}
          aria-labelledby="tableTitle"
          size="medium"
        //   size={dense ? "small" : "medium"}
        >
          {columnData}
          {rowData}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StyledTable;
