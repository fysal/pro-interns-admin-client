import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getAllShortlists } from "../actions/shortlists.action";
import SearchBox from "../components/searchAndFilters/SearchBox";
import Pagination from "../components/Pagination";
import PaginationHandler from "../utils/functions/PaginationHandler";
import countryList from "../utils/countries.json";
import SelectInput from "../components/searchAndFilters/SelectFilter";

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
import GrowSpinnerLoader from "../components/loaders/GrowSpinner.loader";

const Shortlists = () => {
  const dispatch = useDispatch();
  const shortlistFromState = useSelector(
    (state) => state.shortlistState.shortlist
  );
  const [shortlist, setShortlist] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!shortlistFromState) dispatch(getAllShortlists());
    else {
      let __employerList = [];
      let __countries = [];
      for (let __list of shortlistFromState) {
        const check = __employerList.find(
          (item) => item.employerName === __list.employer.employerName
        );
        if (!check) __employerList.push(__list.employer);

        countryList.forEach((country) => {
          if (
            country.code === __list.nationality &&
            !__countries.includes(country.name)
          )
            __countries.push(country.name);
        });
      }
      setEmployer(__employerList);
      setCountries([...__countries]);
    }
  }, [shortlistFromState]);
  const onChange = (e) => {};

  const onSetShortlist = (event, employer) => {
    const list = shortlistFromState.filter(
      (list) => list.employer.employerName.toString() === employer.toString()
    );
    setShortlist(list);
  };

  return (
    <>
      <Helmet title={`Shortlist | ${process.env.REACT_APP_TAGLINE}`} />
      {/* <h6>Shortlists</h6> */}
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="filter-wrapper">
            <SearchBox
              onChange={(e) => onChange(e)}
              placeholder="Search by employer name"
              name="employerName"
              id="employerName"
            />
          </div>
          {!employer ? (
            <>
            <GrowSpinnerLoader  text="Please wait..."/>
            </>
          ) : (
            employer?.map((emp, index) => (
              <Card
                employer={emp}
                key={index}
                onSetShortlist={onSetShortlist}
              />
            ))
          )}
        </div>
        <div className="col-sm-12 col-md-8 h-100">
          <div className="filter-wrapper d-flex align-items-center justify-content-between">
            <SearchBox
              placeholder="Search by name"
              name="internName"
              id="internName"
              onChange={(e) => onChange(e)}
            />
            <SelectInput
              placeholder="Country"
              list={countries}
              name="country"
              id="country"
              onChange={(e) => onChange(e)}
            />
            <SelectInput
              placeholder="Gender"
              list={["male", "female"]}
              name="gender"
              id="gender"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-sm btn-danger ms-2">Clear</button>
          </div>
          {!shortlist ? (
            <div className="d-flex align-items-center justify-content-center bg-white p-5 h-50 text-muted">
              Select employer to view list
            </div>
          ) : (
            <Paper elevation={0}>
              <TableContainer>
                <Table className="acc_table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Candidate's Name</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shortlist?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center">
                            <Avatar
                              src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${item.avatar}`}
                              className="me-2"
                            />
                            <div>
                              {item.firstName} {item.lastName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {
                            countryList.filter(
                              (country) => country.code === item.nationality
                            )[0].name
                          }
                        </TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center justify-content-between flex-end">
                            <button className="btn btn-sm btn-outline-secondary py-1 px-1 me-2 rounded material-icons-outlined small">
                              edit
                            </button>
                            <button className="btn btn-sm btn-outline-secondary py-1 px-1 me-2 rounded material-icons-outlined small">
                              delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </div>
      </div>
    </>
  );
};

export default Shortlists;

export const Card = ({ employer, onSetShortlist }) => {
  return (
    <div
      className="d-flex align-items-start bg-white pointer app_list mb-2 p-3"
      onClick={(e) => onSetShortlist(e, employer.employerName)}
    >
      <Avatar
        src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${employer.employerAvatar}`}
        className="me-2"
      />
      <div className="flex-1">
        <div className="fw-bold text-pro-secondary text-capitalize small mb-1">
          {employer.employerName}
        </div>
        <div className="text-pro-sencondary-light small font-weight-small text-capitalize">
          {employer.employerType}
        </div>
        {/* <div className="text-secondary small fw-normal mt-1 ">
          Size: {employer.noOfEmployees}
        </div> */}
      </div>
      <span className="material-icons-outlined float-end">more_vert</span>
    </div>
  );
};
