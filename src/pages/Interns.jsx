import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllInterns } from "../actions/interns.action";
import { Helmet } from "react-helmet";
import PaginationHandler from "../utils/functions/PaginationHandler";
import Moment from "react-moment";
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
import { Link } from "react-router-dom";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";

const Interns = () => {
  const dispatch = useDispatch();
  const internsFromState = useSelector((state) => state.internsState.interns);
  const [filterList, setFilterList] = useState({
    genderFilter: [],
    nationalityFilter: [],
    statusFilter: [],
  });
  const [rows, setRows] = useState(internsFromState ?? null);
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
    if (!internsFromState) dispatch(getAllInterns());
    else {
      const genderFilter = [];
      const nationalityFilter = [];
      const statusFilter = [];
      setRows(internsFromState);

      for (let intern of internsFromState) {
        if (!genderFilter.includes(intern.gender) && intern.gender)
          genderFilter.push(intern.gender);
        if (
          !nationalityFilter.includes(intern.nationality) &&
          intern.nationality
        )
          nationalityFilter.push(intern.nationality);
        if (!statusFilter.includes(intern.status) && intern.status)
          statusFilter.push(intern.status);
      }
      setFilterList({ genderFilter, nationalityFilter, statusFilter });

       
    }
  }, [internsFromState]);



  const onChange = () => {};
    
  return (
    <>
      <Helmet title={`Interns | ${process.env.REACT_APP_TAGLINE}`} />
      <div className="d-flex align-items-center justify-content-between">
        <h5>Interns</h5>
        <Link exact to="/admin/intern/add" className="btn btn-primary btn-sm">Add intern</Link>
      </div>
      <div className="d-flex align-items-center justify-content-between filter-wrapper">
        <Input placeholder="Search by name" onChange={onChange} name="name" />

        <SelectFilter
          name="gender"
          list={filterList.genderFilter}
          placeholder="Filter by gender"
          id="gender"
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
          name="nationality"
          list={filterList.nationalityFilter}
          placeholder="Filter by nationality"
          id="nationality"
          onChange={onChange}
        />
        <button className="btn btn-sm btn-danger ms-2">Clear</button>
      </div>
      {!rows ? (
        
          <BorderSpinnerLoader />
          
        
      ) : (
        <Paper elevation={0}>
          <TableContainer>
            <Table className="acc_table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Nationality</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Profile %</TableCell>
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
                  ).map((intern) => (
                    <TableRow key={intern._id}>
                      <TableCell>
                        <div className="d-flex align-items-center">
                          <Avatar
                            size="small"
                            alt={intern.firstName}
                            className="me-1"
                          />
                          <div>
                            {intern.firstName} {intern.lastName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{intern.gender || "N/A"}</div>
                      </TableCell>
                      <TableCell>{intern.nationality || "N/A"} </TableCell>
                      <TableCell>{intern.status} </TableCell>
                      <TableCell>
                        {intern.dateOfBirth ? (
                          <>
                            <Moment
                              date={intern.dateOfBirth}
                              durationFromNow
                              format="YY"
                            />{" "}
                            Yrs{" "}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        {intern.email && (
                          <div className="d-flex align-items-center mb-3">
                            <span className="material-icons-outlined small text-muted me-2">
                              email
                            </span>
                            <span className="small">
                              {intern.email.toLowerCase()}
                            </span>
                          </div>
                        )}

                        {intern.phone && (
                          <div className="d-flex align-items-center">
                            <span className="material-icons-outlined small text-muted me-2">
                              phone
                            </span>{" "}
                            <span className="small">{intern.phone}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {intern.profileCompletePercentage} %
                      </TableCell>
                      <TableCell>
                        <Moment date={intern.dateCreated} fromNow />
                      </TableCell>

                      <TableCell>
                        <div className="d-flex align-items-center justify-content-between">
                          <button className="btn btn-outline-secondary btn-sm material-icons-outlined small p-1">
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

export default Interns;
