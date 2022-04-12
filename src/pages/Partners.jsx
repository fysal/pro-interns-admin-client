import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/searchAndFilters/SearchBox";
import Pagination from "../components/Pagination";
import PaginationHandler from "../utils/functions/PaginationHandler";
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
const Partners = () => {
  const partners = [
    {
      logo: "",
      name: "Faisal Kasozi",
      categories: ["category1", "category2", "category3", "category4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "Tim cook",
      categories: ["category1", "category2", "category3", "category4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "partner",
      categories: ["category1", "category2", "category3", "category4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "partner",
      categories: ["category1", "category2", "category3", "category:4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "partner",
      categories: ["category1", "category2", "category3", "category4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "partner",
      categories: ["category1", "category2", "category3", "category4"],
      website: "example.com",
    },
    {
      logo: "",
      name: "partner",
      categories: ["category1", "category2", "category3", "category:4"],
      website: "example.com",
    },
  ];

  const [rows, setRows] = useState(null);
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
    setRows(partners);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h5>Partners</h5>
      </div>
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-7">
          <PartnersTable
            list={partners}
            paginationHandler={paginationHandler}
            pages={pages}
            rows={rows}
            rowsPerPage={rowsPerPage}
          />
        </div>
        <div className="col-sm-12 col-xs-12 col-md-5">
          <PartnerForm />
        </div>
      </div>
    </>
  );
};

export default Partners;

export const PartnersTable = ({ paginationHandler, pages, rows, rowsPerPage }) => {
  return (
    <>
      <Paper elevation={0}>
        <TableContainer>
          <Table className="acc_table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 &&
                (rowsPerPage > 0
                  ? rows.slice(
                      paginationHandler.indexOfFirstItem(),
                      paginationHandler.indexOfLastItem()
                    )
                  : rows
                ).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-start">
                        <Avatar src={item.logo} className="usr_sm_avatar me-2">
                          {item.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="">{item.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-start flex-wrap">
                        {item.categories.map((item, index) => (
                          <span className="chip" key={index}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{item.website}</TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-sm btn-outline-secondary material-icons-outlined small p-1">
                          edit
                        </button>
                        <button className="btn btn-sm btn-outline-secondary material-icons-outlined small p-1">
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
      {rows?.length > 0 && (
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
    </>
  );
};

export const PartnerForm = () => {
  return (
    <div className="inner bg-white p-4">
      <h6> Add Partner</h6>
      <form>
        <label className="form-label">Logo</label>
        <div className="d-flex align-items-start mb-3 upload_bound">
          <Avatar variant="rounded" className="user_md_avatar me-4" />
          <div className="">
            <div className="small text-pro-secondary">
              Browse logo from your computer
            </div>
            <div className="small text-muted">Maximum size 1Mb</div>
            <label className="btn btn-sm btn-primary mt-2" htmlFor="file">
              <span className="small">Upload logo</span>
            </label>
            <input type="file" name="file" id="file" className="input_hidden" />
          </div>
        </div>
        <Input
          name="name"
          placeholder="Enter name"
          classes="mb-3"
          label="Partner name"
        />

        <Input
          name="website"
          placeholder="Ex. http://example.com"
          classes="mb-3"
          label="Website"
        />
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <textarea
          className="form-control small"
          placeholder="Partner description"
          rows="5"
          id="desc"
        />
        <div className="sink_input_wrapepr mt-4">
          <input className="sink_input" placeholder="Add category" />
        </div>
        <div className="d-flex align-items-center justify-content-end mt-3">
          <input
            type="submit"
            value="Add partner"
            className="btn btn-primary btn-sm small me-3"
          />
          <input
            type="submit"
            value="Clear"
            className="btn btn-danger btn-sm"
          />
        </div>
      </form>
    </div>
  );
};
