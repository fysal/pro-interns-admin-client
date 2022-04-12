import { Avatar } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";
import CircularProgressWidget from "./CircularProgress.widget";

const EmployerWidget = () => {
  const employers = useSelector((state) =>
    state.employersState?.employers?.slice(0, 10)
  );
  return (
    <div className="bg-white rounded">
      <div className="dash_block border-bottom">
        <div className="dashtableHead text-capitalize">Latest employers</div>
      </div>
      <div className="hide-scrollbar dash-400">
        {employers ? (
          <ListView employers={employers} />
        ) : (
          <BorderSpinnerLoader />
        )}
      </div>
    </div>
  );
};

export default EmployerWidget;

const ListView = ({ employers }) => {
  return (
    <>
      {employers?.map((employer) => (
        <div
          className="d-flex align-items-center justify-content-between small px-3 py-2 border-bottom text-capitalize small"
          key={employer._id}
        >
          <div className="d-flex align-items-center flex-1">
            <Avatar
              className="usr_tn_avatar avatar_secondary_light  me-2"
              src={employer.avatar}
            >
              {employer.employerName.charAt(0)}
            </Avatar>
            <div className="small">{employer.employerName}</div>
          </div>

          <div className="flex-2 px-4 text-center">
            <CircularProgressWidget
              value={employer.profileCompletePercentage || 0}
            />
          </div>

          <div className="flex-1 text-capitalize small fw-800">
            {employer.currentPlan.planName}
          </div>
          <div className="flex-2 small px-2"><Moment date={employer.dateCreated} fromNow /></div>
          <div className="flex-2 small ms-2">
            <span
              className={clsx(
                employer.status === "active" ? "alert-success" : "alert-danger","rounded-pill py-1 px-2 small"
              )}
            >
              {employer.status}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
