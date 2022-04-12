import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@material-ui/core";
import React from "react";

const ReusableTable = ({
  rows=[],
  columns =[],
  actions = [],
  currentPage,
  rowsPerPage,
  pageNumberLimit,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
  const pages = [];

  for (let i =1; i <= Math.ceil(rows.length / rowsPerPage); i ++) pages.push(i);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="acc_table" aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(indexOfFirstItem, indexOfLastItem)
              : rows
            ).map((item) => (
              <TableRow key={item.id}>
                
               <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReusableTable;
