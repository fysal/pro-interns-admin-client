import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOpportunities } from "../actions/opportunities.actions";
import Moment from "react-moment";
import Input from "../components/searchAndFilters/SearchBox";
import SelectFilter from "../components/searchAndFilters/SelectFilter";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import Pagination from "../components/Pagination";
import PaginationHandler from "../utils/functions/PaginationHandler";
import { Link } from "react-router-dom";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";

const Opportunities = () => {
  const [filterList, setFilterList] = useState({
    employerList: [],
    statusList: [],
    entryLevelList: [],
    salaryTypeList: [],
  });

  const dispatch = useDispatch();
    const opportunities = useSelector(
      (state) => state.opportunitiesState.allOpportunities
    );
  const [rows, setRows] = useState(opportunities ?? null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


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
    if (!opportunities) {
      dispatch(getAllOpportunities());
    } else {
      setRows([...opportunities]);
      const employerList = [];
      const statusList = [];
      const entryLevelList = [];
      const salaryTypeList = [];
      for (let opp of opportunities) {
        if (!statusList.includes(opp.jobStatus) && opp.jobStatus)
          statusList.push(opp.jobStatus);
        if (!employerList.includes(opp.title)) employerList.push(opp.title);
        if (!entryLevelList.includes(opp.entryLevel) && opp.entryLevel)
          entryLevelList.push(opp.entryLevel);
        if (!salaryTypeList.includes(opp.salaryType))
          salaryTypeList.push(opp.salaryType);
      }
      setFilterList({
        employerList,
        statusList,
        entryLevelList,
        salaryTypeList,
      });
    }
  }, [opportunities]);

  const onSearchOpportunity = () => {};

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Opportunities</h4>

        <Link className="btn btn-sm btn-primary" to="/admin/opportunity/add">Add Opportunity</Link>
      </div>
      <div className="d-flex align-items-center justify-content-between filter-wrapper">
        <Input
          placeholder="Search by title"
          name="opp_search"
          id="opp_search"
          onChange={(e) => onSearchOpportunity(e)}
        />
        <SelectFilter
          list={filterList.employerList}
          name="opportunity"
          placeholder="opportunity title"
        />
        <SelectFilter
          list={filterList.statusList}
          name="status"
          placeholder="Status"
        />
        <SelectFilter
          list={filterList.entryLevelList}
          name="entry level"
          placeholder="Entry level"
        />
        <SelectFilter
          list={filterList.salaryTypeList}
          name="salaryType"
          placeholder="Salary type"
        />
        <button className="btn btn-sm btn-danger ms-2">Clear</button>
      </div>
      {!rows ? (   <>
          <BorderSpinnerLoader />
        </>) : (<Paper elevation={0}>
        <TableContainer>
          <Table className="acc_table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Opportunity Title</TableCell>
                <TableCell>Employer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Entry level</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Date create</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 && (rowsPerPage > 0
                ? rows.slice(
                    paginationHandler.indexOfFirstItem(),
                    paginationHandler.indexOfLastItem()
                  )
                : rows).map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Typography variant="body2">{item.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.author.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.jobStatus}</TableCell>
                      <TableCell>{item.entryLevel}</TableCell>
                      <TableCell>{item.salaryType}</TableCell>
                      <TableCell>
                        <Moment date={item.createdAt} fromNow />
                      </TableCell>
                      <TableCell>
                        <Moment date={item.deadline} format="D/M/Y" />
                      </TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-between">
                          <button className="btn btn-sm btn-outline-secondary py-1 px-1 me-2 rounded material-icons-outlined small">
                            edit
                          </button>
                          <buttonn className="btn btn-sm btn-outline-secondary py-1 px-1 material-icons-outlined small">
                            delete
                          </buttonn>
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
      </Paper>)}
      
    </>
  );
};

export default Opportunities;
