import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/searchAndFilters/SearchBox";
import { Link } from "react-router-dom";
import SelectFilter from "../searchAndFilters/SelectFilter";
import ReactQuill from "react-quill";
import ChipsInput from "../searchAndFilters/ChipsInput";

const OpportunityForm = () => {
  const dispatch = useDispatch();
  const onChange = () => {};
  const authRef = useRef();
  const [author, setAuthor] = useState({ id: "", author: "" });
  const listing = [
    { id: "1", name: "Creative mode limited" },
    { id: "2", name: "samsung limited" },
    { id: "3", name: "apple corps" },
    { id: "4", name: "carrot creative" },
    { id: "5", name: "Fysal bank" },
  ];
  const [empList, setEmpList] = useState(listing);

  const onAuthorFilter = (e) => {
      document.querySelector('.list-fill').classList.add('active');
    if (authRef.current.value !== "" && authRef.current.value !== null) {
        setAuthor({ id: "", author: "" });
      const empLi = empList.filter((list) =>
        list.name.toLowerCase().includes(authRef.current.value.toLowerCase())
      );
      setEmpList(empLi);
    } else {
      setEmpList(listing);
    }
  };
  return (
    <>
      <Link
        to="/admin/opportunities"
        className="btn btn-sm btn-muted mb-3 d-flex align-items-center"
      >
        <span className="material-icons-outlined small">arrow_back</span>{" "}
        <span>Back to opportunities</span>
      </Link>
      <div className="row">
        <div className="col-sm-12 col-md-10">
          <form className="bg-white p-4">
            <h5 className="mb-3">Add new opportunity</h5>
            <div className="mb-4">
              <Input
                name="title"
                id="title"
                placeholder="Add title"
                label="Title"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <Input
                name="location"
                id="location"
                placeholder="Location"
                label="Locaton"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <Input
                type="date"
                name="date"
                id="date"
                placeholder="Enter deadline"
                label="Deadline"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <SelectFilter
                list={["paid", "salary", "allowance"]}
                name="salaryType"
                id="salaryType"
                placeholder="Select salary type"
                label="Salary Type"
              />
            </div>
            <div className="mb-4">
              <SelectFilter
                list={["intermediate level", "mid level", "professional level"]}
                name="entryLevel"
                id="entryLevel"
                placeholder="Select entry level"
                label="Entry level"
              />
            </div>
            <div className="mb-4">
              <ChipsInput list={["reading"]} label="Required skills" />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <ReactQuill
                placeholder="Add opportunity description"
                id="description"
              />
            </div>

            <div className="author-wrap mb-4">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                name="author"
                id="author"
                ref={authRef}
                autoComplete="none"
                autofill={false}
                onChange={(e) => onAuthorFilter(e)}
              />
              <div className="list-fill">
                <ul>
                  {empList.map((list) => (
                    <li
                      key={list.id}
                      className="pointer"
                      onClick={() => {
                        setAuthor({ ...list });
                        authRef.current.value = list.name;
                        document
                          .querySelector(".list-fill")
                          .classList.remove("active");
                      }}
                    >
                      {list.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OpportunityForm;
