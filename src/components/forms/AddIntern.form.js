import React, { useState, useEffect, useRef } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import Input from "../../components/searchAndFilters/SearchBox";
import ChipsInput from "../../components/searchAndFilters/ChipsInput";
import SelectFilter from "../../components/searchAndFilters/SelectFilter";
import ReactQuill from "react-quill";
import PhoneInput from "react-phone-input-2";
import ReactFlagsSelect from "react-flags-select";

const AddInternForm = () => {
  const chipRef = useRef();
  const [steps, setSteps] = useState([
    "Account information",
    "Profile information",
    "Education history",
    "Work history",
    "Skills & Documents",
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState("UG");
  const [present, setPresent] = useState(true);
  const [skills, setSkills] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCancel = () => {
    setActiveStep(0);
  };



  const onChange = () => {};
  const onChipDelete = () =>{}

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                id="email"
                onChange={onChange}
                label="Email"
                placeholder="Enter emial address"
              />
            </div>
            <div className="mb-4">
              <Input
                name="firstName"
                id="firstName"
                onChange={onChange}
                label="First name"
                placeholder="Enter first name"
              />
            </div>
            <div className="mb-4">
              <Input
                name="lastName"
                id="lastName"
                onChange={onChange}
                label="Last name"
                placeholder="Enter last name"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                label="Password"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={onChange}
                label="Confirm password"
                placeholder="Enter confirmation password"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                className="form-control"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <PhoneInput
                country="ug"
                id="phone"
                name="phone"
                onChange={(phone) => onChange(phone)}
              />
            </div>
            <div className="mb-4">
              <SelectFilter
                list={["male", "female"]}
                name="gender"
                id="gender"
                onChange={onChange}
                label="Gender"
                placeholder="Select gender"
              />
            </div>
            <div className="mb-4">
              <Input
                type="date"
                name="dob"
                id="dob"
                onChange={onChange}
                label="Date of birth"
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Nationality</label>
              <ReactFlagsSelect selected={selected} />
            </div>
            <div className="mb-4">
              <label className="form-label">Biography</label>
              <ReactQuill
                name="bio"
                id="bio"
                onChange={onChange}
                placeholder="Enter interns biography"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <div className="mb-4">
                  <Input
                    name="school"
                    id="school"
                    label="School"
                    placeholder="Enter the school's name"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <SelectFilter
                    name="degree"
                    list={[
                      "bachelor",
                      "diploma",
                      "certificate",
                      "masters",
                      "doctorate",
                    ]}
                    id="degree"
                    label="Degree"
                    placeholder="Select degree type"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    name="fieldOfStudy"
                    id="fieldOfStudy"
                    label="Field of study"
                    placeholder="Enter the school's name"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="date"
                    name="startYear"
                    id="startYear"
                    onChange={onChange}
                    label="Start year"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="date"
                    name="endYear"
                    id="endYear"
                    onChange={onChange}
                    label="End year"
                  />
                </div>
                <div className="mb-4">
                  <SelectFilter
                    list={[
                      "First class",
                      "second class upper",
                      "second class lower",
                      "A",
                      "B",
                      "C",
                      "D",
                      "F",
                    ]}
                    name="grade"
                    id="grade"
                    onChange={onChange}
                    label="Grade"
                    placeholder="Select grade"
                  />
                </div>
                <button className="btn btn-sm btn-success float-end">
                  Add to list
                </button>
              </div>
              <div className="col-sm-12 col-md-4">
                <h6>Schools' list</h6>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <div className="mb-4">
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    label="Title"
                    placeholder="Enter job title"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <SelectFilter
                    list={[
                      "self-employed",
                      "full-time",
                      "part-time",
                      "internship",
                      "contract",
                      "seasonal",
                    ]}
                    label="Employement Type"
                    name="employmentType"
                    id="employementType"
                    placeholder="Select employent type"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    name="company"
                    label="Company name"
                    id="company"
                    onChange={onChange}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="date"
                    name="startDate"
                    label="Start date"
                    id="startDate"
                    onChange={onChange}
                  />
                </div>
                <div className="form-check form-switch mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="present"
                    id="present"
                    checked={present}
                    onChange={() => setPresent((prevPresent) => !prevPresent)}
                  />
                  <label className="form-check-label" htmlFor="present">
                    Present
                  </label>
                </div>
                {!present && (
                  <div className="mb-4">
                    <Input
                      type="date"
                      name="endDate"
                      label="End date"
                      id="endDate"
                      onChange={onChange}
                    />
                  </div>
                )}
                <div className="mb-4">
                  <Input
                    name="location"
                    label="Location"
                    id="locattion"
                    onChange={onChange}
                    placeholder="Enter location"
                  />
                </div>
                <button className="btn btn-primary float-end">
                  Add to list
                </button>
              </div>
              <div className="col-sm-12 col-md-4">
                <h6>Employment List</h6>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="mb-4">
              <ChipsInput
                list={skills}
                name="skills"
                id="skils"
                chipRef={chipRef}
                label="Skills"
                description="Press enter key to add skill"
                placeholder="Enter skills here"
                onChange={onChange}
                onChipDelete={onChipDelete}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="mb-4">
                  <label htmlFor="cv" className="form-label">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    name="cv"
                    id="cv"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="mb-4">
                  <label htmlFor="cv" className="form-label">
                    Upload Cover letter
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    name="coverLetter"
                    id="coverLetter"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return;
    }
  };

  return (
    <>
      <NavLink
        to="/admin/interns"
        className="btn btn-sm btn-muted mb-3 d-flex align-items-center"
      >
        <span className="material-icons-outlined small">arrow_back</span>{" "}
        <span>Back to interns</span>
      </NavLink>
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className="text-capitalize">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="bg-white mt-3 p-4">
        <h6 className="mb-4 mt-2 text-uppercase">{steps[activeStep]}</h6>
        {activeStep === steps.length ? (
          <div>
            <div>summery of all data</div>
            <div className="d-flex align-items-center justify-content-between">
              <span
                className="btn btn-sm btn-secondary me-3 d-flex align-items-center"
                onClick={() => handleBack()}
              >
                <span className="material-icons-outlined  small">
                  arrow_back
                </span>
                <span className="small ">Back</span>
              </span>
              <button className="btn btn-sm btn-success">Create  new intern</button>
            </div>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)} </div>
            <div className="d-flex align-items-center mt-5 mb-3">
              {activeStep > 0 && (
                <span
                  className="btn btn-sm btn-secondary me-3 d-flex align-items-center"
                  onClick={() => handleBack()}
                >
                  <span className="material-icons-outlined  small">
                    arrow_back
                  </span>
                  <span className="small ">Back</span>
                </span>
              )}

              {activeStep < steps.length && (
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center"
                  onClick={() => handleNext()}
                >
                  <span className="small">Next</span>
                  <span className="small material-icons-outlined ">
                    arrow_forward
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddInternForm;
