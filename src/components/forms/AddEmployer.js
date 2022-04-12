import React, { useState, useEffect } from "react";
import Input from "../searchAndFilters/SearchBox";
import { Stepper, Step, StepLabel} from "@material-ui/core";
import { Link } from 'react-router-dom';
import SelectFilter from "../searchAndFilters/SelectFilter";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddEmployer = ({ setShowModal }) => {
  const onChange = () => {};
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const [activeStep, setActiveStep] = useState(0);
  const [sameAsBilling, setSameASBilling] = useState(true);

  const [steps, setSteps] = useState([
    "Account information",
    "Employer information",
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    if (sameAsBilling === false) {
      setSteps([...steps, "Billing information"]);
    } else {
      setSteps(steps.filter((step) => step !== "Billing information"));
    }
  }, [sameAsBilling]);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <div className="mb-3">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter employer email"
                onChange={onChange}
                label="Email"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                name="employerName"
                id="employerName"
                placeholder="Enter employer name"
                onChange={onChange}
                label="Employer name"
              />
            </div>
            <div className="mb-3">
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
                name="confirm-password"
                id="confirm-password"
                onChange={onChange}
                label="Confirm password"
                placeholder="Enter confirm password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <PhoneInput
                country="ug"
                name="phone"
                id="phone"
                onChange={(phone) => onChange(phone)}
                label="Phone"
                placeholder="Enter phone number"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="logo" className="form-label">
                Upload logo
              </label>
              <input
                type="file"
                className="form-control"
                name="logo"
                id="logo"
                accept="image/*"
                placeholder="Upload logo"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Enter address"
                label="Address"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <SelectFilter
                list={["Dgital marketing"]}
                placeholder="Select employer type"
                label="Employer type"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <SelectFilter
                list={["10-50", "50-100"]}
                placeholder="Select employer size"
                label="# of employers"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Employer Biography</label>
              <ReactQuill id="bio" name="bio" placeholder="Enter company bio" />
            </div>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                name="sameAsBilling"
                id="sameAsBilling"
                className="form-check-input"
                role="switch"
                checked={sameAsBilling}
                onChange={() => setSameASBilling((prevState) => !prevState)}
              />
              <label htmlFor="sameAsBilling">
                Billing same as address information
              </label>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-3">
              {" "}
              <Input
                type="text"
                name="fullName"
                label="Full Name"
                id="fullName"
                onChange={onChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                name="businessName"
                id="businessName"
                placeholder="Ex.Tesla corporation"
                label="Business Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="businessPhone">
                Phone number
              </label>
              <PhoneInput
                country={"ug"}
                onChange={(phone) => onChange(phone)}
                id="businessPhone"
                name="businessPhone"
              />
            </div>
            <div className="mb-3">
              <Input
                type="email"
                name="businessEmail"
                id="businessName"
                label="Email Address"
                placeholder="info@example.com"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Ex. Mckinon road, kampala Uganda"
                label="Address"
                onChange={onChange}
                name="businessAddress"
                id="businessgAddress"
              />
            </div>
          </>
        );
      default:
        return;
    }
  };
  return (
    <>
      <Link
        to="/admin/employers"
        className="btn btn-sm btn-muted mb-3 d-flex align-items-center"
      >
        <span className="material-icons-outlined small">arrow_back</span>{" "}
        <span>Back to employers</span>
      </Link>
      <div className="row">
        <div className="col-sm-12 col-md-10">
          <form onSubmit={(e) => onSubmit(e)} className="">
            <span
              className="material-icons-outlined pointer close close-right-out"
              onClick={() => setShowModal(false)}
            >
              close
            </span>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  {" "}
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="bg-white mt-2 p-4">
              <h6 className="mb-3">Add new employer</h6>
              {activeStep === steps.length ? (
                <>
                  <div className="d-flex align-items-center justify-content-between m-3">
                    <button
                      className="btn btn-secondary btn-sm d-flex align-items-center"
                      onClick={() => handleBack()}
                    >
                      <span className="material-icons-outlined small">
                        arrow_back
                      </span>{" "}
                      <span className="small">Back</span>
                    </button>
                    <button className="btn btn-sm btn-success ">
                      Create new employer
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  {getStepContent(activeStep)}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployer;
