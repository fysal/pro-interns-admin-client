import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployers } from "../actions/employers.actions";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import PaginationHandler from "../utils/functions/PaginationHandler";
import Pagination from "../components/Pagination";
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
import SelectFilter from "../components/searchAndFilters/SelectFilter";
import Input from "../components/searchAndFilters/SearchBox";
import ModalWindow from "../components/modal/popup.modal";
import AddEmployer from '../components/forms/AddEmployer';
import { Link } from "react-router-dom";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";

const Employers = () => {
  const dispatch = useDispatch();
  const employersFromState = useSelector(
    (state) => state.employersState.employers
  );
  const [rows, setRows] = useState(employersFromState ?? null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [filterList, setFilterList] = useState({
    packageFilter: [],
    statusFilter: [],
    sizeFilter: [],
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
    if (!employersFromState) dispatch(getAllEmployers());
    else {
      const packageFilter = [];
      const statusFilter = [];
      const sizeFilter = [];
      setRows(employersFromState);

      for (let emp of employersFromState) {
        if (
          !packageFilter.includes(emp.currentPlan.planName) &&
          emp.currentPlan.planName
        )
          packageFilter.push(emp.currentPlan.planName);
        if (!statusFilter.includes(emp.status)) statusFilter.push(emp.status);
        if (!sizeFilter.includes(emp.noOfEmployees) && emp.noOfEmployees)
          sizeFilter.push(emp.noOfEmployees);
      }
      setFilterList({ packageFilter, statusFilter, sizeFilter });
    }
  }, [employersFromState]);

  const onChange = () => {};
  return (
    <>
      <Helmet title={`Employers | ${process.env.REACT_APP_TAGLINE}`} />

      <div className="d-flex align-items-center justify-content-between">
        <h5>Employers</h5>
        <Link to="/admin/employer/add"
          className="btn btn-sm btn-primary"
         
        >
          Add employer
        </Link>
      </div>

      <div className="d-flex align-items-center justify-content-between filter-wrapper">
        <Input placeholder="Search by name" onChange={onChange} name="name" />

        <SelectFilter
          name="package"
          list={filterList.packageFilter}
          placeholder="Filter by package"
          id="package"
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
          name="size"
          list={filterList.sizeFilter}
          placeholder="Filter by size"
          id="size"
          onChange={onChange}
        />
        <button className="btn btn-sm btn-danger ms-2">Clear</button>
      </div>
      {!rows ? (
        <>
        <BorderSpinnerLoader />
        </>
      ) : (
        <Paper elevation={0}>
          <TableContainer>
            <Table className="acc_table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Employer Name</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Profile %</TableCell>
                  <TableCell>Created</TableCell>
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
                  ).map((employer) => (
                    <TableRow key={employer._id}>
                      <TableCell>
                        <div className="d-flex align-items-center">
                          <Avatar
                            size="small"
                            alt={employer.employerName}
                            className="me-2"
                          >
                            {employer.employerName.charAt(0)}
                          </Avatar>
                          <div>{employer.employerName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{employer.currentPlan.planName}</div>
                      </TableCell>

                      <TableCell>{employer.employerType}</TableCell>
                      <TableCell>{employer.noOfEmployees}</TableCell>
                      <TableCell>{employer.status}</TableCell>
                      <TableCell>
                        {employer.profileCompletePercentage}%
                      </TableCell>
                      <TableCell>
                        <Moment date={employer.dateCreated} fromNow />
                      </TableCell>

                      <TableCell>
                        <div className="d-flex align-items-center justify-content-between">
                          <button className="btn btn-sm btn-outline-secondary material-icons-outlined small p-1">
                            info
                          </button>
                          <button className="btn btn-sm btn-outline-secondary material-icons-outlined small p-1">
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

export default Employers;
