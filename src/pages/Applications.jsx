import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApplications } from "../actions/application.actions";
import { Helmet } from "react-helmet";
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
  Avatar,
} from "@material-ui/core";
import Moment from "react-moment";
import PaginationHandler from "../utils/functions/PaginationHandler";
import Pagination from "../components/Pagination";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";

const Applications = () => {
  const dispatch = useDispatch();
  const [filterList, setFilterList] = useState({
    employerFilter: [],
    statusFilter: [],
    genderFilter: [],
    opportunityFilter: [],
  });
  const applicationsFromState = useSelector(
    (state) => state.applicationsState.applications
  );
  const [rows, setRows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    if (!applicationsFromState) dispatch(getAllApplications());
    else {
      const employerFilter = [];
      const statusFilter = [];
      const genderFilter = [];
      const opportunityFilter = [];
      setRows([...applicationsFromState]);

      for (let app of applicationsFromState) {
        if (!employerFilter.includes(app.employer) && app.employer)
          employerFilter.push(app.employer);
        if (
          !statusFilter.includes(app.applicationStatus) &&
          app.applicationStatus
        )
          statusFilter.push(app.applicationStatus);
        if (!genderFilter.includes(app.gender) && app.gender)
          genderFilter.push(app.gender);
        if (!opportunityFilter.includes(app.opportunity) && app.opportunity)
          opportunityFilter.push(app.opportunity);
      }
      setFilterList({
        employerFilter,
        statusFilter,
        genderFilter,
        opportunityFilter,
      });
    }
  }, [applicationsFromState]);

  console.log(filterList);

  const onChange = () => {};
  return (
    <>
      <Helmet title={`Applications | ${process.env.REACT_APP_TAGLINE}`} />

      <h5>Applications</h5>
      <div className="d-flex align-items-center justify-content-between filter-wrapper">
        <Input placeholder="Search by name" onChange={onChange} name="name" />
        <SelectFilter
          name="opportunity"
          list={filterList.opportunityFilter}
          placeholder="Filter by opportunity"
          id="opportunity"
          onChange={onChange}
        />
        <SelectFilter
          name="employer"
          list={filterList.employerFilter}
          placeholder="Filter by employer"
          id="employer"
          onChange={onChange}
        />
        <SelectFilter
          name="status"
          list={filterList.statusFilter}
          placeholder="Filter by status"
          id="status"
          onChange={onChange}
        />
        <SelectFilter
          name="gender"
          list={filterList.genderFilter}
          placeholder="Filter by gender"
          id="gender"
          onChange={onChange}
        />
        <button className="btn btn-sm btn-danger ms-2">Clear</button>
      </div>
      {!rows ? (
        <>
          <BorderSpinnerLoader text="Loading please wait..." />
        </>
      ) : (
        <Paper elevation={0}>
          <TableContainer>
            <Table className="acc_table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Opportunity</TableCell>
                  <TableCell>Employer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Nationality</TableCell>
                  <TableCell>Apply date</TableCell>
                  <TableCell>Action</TableCell>
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
                  ).map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-start">
                          <Avatar
                            size="small"
                            alt={item.firstName}
                            className="me-3"
                          />
                          <div>
                            {item.firstName} {item.lastName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{item.opportunity}</div>
                      </TableCell>
                      <TableCell>{item.employer} </TableCell>
                      <TableCell>{item.applicationStatus}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.nationality}</TableCell>
                      <TableCell>
                        <Moment date={item.date} fromNow />
                      </TableCell>

                      <TableCell>
                        <div className="d-flex align-items-center justify-content-between">
                          <button className="btn btn-outline-secondary btn-sm material-icons-outlined small me-2 p-1">
                            info
                          </button>
                          <button className="btn btn-outline-secondary btn-sm material-icons-outlined small p-1">
                            edit
                          </button>
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
      )}
    </>
  );
};

export default Applications;
