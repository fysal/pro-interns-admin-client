import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import clsx from "clsx";
import PaginationHandler from "../utils/functions/PaginationHandler";
import Pagination from "../components/Pagination";
import SelectFilter from "../components/searchAndFilters/SelectFilter";
import Input from "../components/searchAndFilters/SearchBox";
import { Helmet } from "react-helmet";

const Transactions = () => {
  const transactionsFromState = useSelector(
    (state) => state.transactionsState.transactions
  );
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [filterList, setFilterList] = useState({
    status: [],
    employers: [],
    verified: ["yes", "no"],
    plan: [],
    method: [],
  });

  const paginationHandler = new PaginationHandler(
    currentPage,
    pageNumberLimit,
    maxPageNumberLimit,
    minPageNumberLimit,
    setCurrentPage,
    rows,
    rowsPerPage,
    setMinPageNumberLimit,
    setMaxPageNumberLimit
  );
  const pages = paginationHandler.pages();

  useEffect(() => {
    if (transactionsFromState !== null) {
        const _status = [];
        const _employer = [];
        const _plan = [];
      setRows(transactionsFromState);
      for(let trans of transactionsFromState) {
        if(!_status.includes(trans.status)) _status.push(trans.status);
        if(!_plan.includes(trans.package.title)) _plan.push(trans.package.title);
        if(!_employer.includes(trans.employer.employerName)) _employer.push(trans.employer.employerName)
      }
setFilterList({...filterList, status : _status, employer: _employer, plan : _plan});

    }
  }, [transactionsFromState]);

  console.log(rows);
  const onSearch = (e) => {};

  return (
    <>
      <Helmet title={`Transactions | ${process.env.REACT_APP_TAGLINE}`} />
      <h5>Transactions</h5>
      <div className="d-flex align-items-center justify-content-between filter-wrapper">
        <Input
          placeholder="By transaction id"
          name="transactionid"
          id="transactionid"
          onChange={(e) => onSearch(e)}
        />
        <SelectFilter
          list={filterList.employer}
          name="opportunity"
          placeholder="Filter by employer"
        />
        <SelectFilter
          list={filterList.status}
          name="status"
          placeholder="Filter by status"
        />
        <SelectFilter
          list={filterList.plan}
          name="Package"
          placeholder="Filter by package"
        />
        <button className="btn btn-sm btn-primary ms-3">Filter</button>
        <button className="btn btn-sm ms-0 small">Clear</button>
      </div>
      <Paper elevation={0} square>
        <TableContainer>
          <Table className="acc_table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trans Id</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Amout</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>verified</TableCell>
                <TableCell>Employer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                (rowsPerPage > 0
                  ? rows.slice(
                      paginationHandler.indexOfFirstItem(),
                      paginationHandler.indexOfLastItem()
                    )
                  : rows
                ).map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      <span className="small">{transaction.transactionId}</span>
                    </TableCell>
                    <TableCell>
                      <span className="small">{transaction.package.title}</span>
                    </TableCell>
                    <TableCell>
                      <Moment
                        className="small"
                        date={transaction.date}
                        format="D/M/Y"
                      />
                    </TableCell>
                    <TableCell>
                      <span className="small">
                        {transaction.merchantReference}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="small">
                        {transaction.amount} {transaction.currency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="small">
                        {transaction.paymentOption === "mobilemoneyug"
                          ? "Mobile Money"
                          : transaction.paymentOption}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={clsx(
                          "small",
                          transaction.status === "successful"
                            ? "text-success"
                            : transaction.status === "pending"
                            ? "text-info"
                            : "text-danger"
                        )}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        className={clsx(
                          "small",
                          transaction.verified === true
                            ? "text-success"
                            : "text-danger"
                        )}
                      >
                        {transaction.verified === true ? "Yes" : "No"}
                      </span>
                      <div>
                        {" "}
                        {transaction.verified === false ? (
                          <span className="bg-warning text-white rounded small px-3 py-1 pointer">
                            Verify
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="small">
                        <div>{transaction.employer.employerName}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 0 && (
          <Pagination
            pages={pages}
            handlePrevious={paginationHandler.handlePrevious}
            handleNext={paginationHandler.handleNext}
            currentPage={paginationHandler.currentPage}
            maxPageNumberLimit={paginationHandler.maxPageNumberLimit}
            minPageNumberLimit={paginationHandler.minPageNumberLimit}
            onHandleChange={paginationHandler.handleChangePageValue}
          />
        )}
      </Paper>
    </>
  );
};

export default Transactions;
