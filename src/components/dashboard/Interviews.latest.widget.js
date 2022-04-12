import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";
import NoResultWiget from "./NoResult.widget";
import { Avatar } from "@material-ui/core";
import Moment from "react-moment";

const InterviewsLatestWidget = () => {
  const interviews = useSelector((state) =>
    state.interviewsState.pending?.slice(0, 10)
  );

  console.log(interviews);
  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom dash_block">
        <div className="dashtableHead">Pending interviews</div>
        <Link className="dash_lnk" to="/admin/interviews">
          View all
        </Link>
      </div>
      {!interviews ? (
        <BorderSpinnerLoader />
      ) : interviews.length < 1 ? (
        <NoResultWiget />
      ) : (
        <div className="hide-scrollbar dash-300">
          {interviews.map((interview) => (
            <div
              className="d-flex align-items-center justify-content-between px-3 py-1 border-bottom"
              key={interview._id}
            >
              <div className="d-flex align-items-center flex-1">
                <Avatar className="usr_tn_avatar avatar_secondary_light me-2">
                  {interview.firstName.charAt(0)}
                </Avatar>
                <div className="small">
                  {interview.firstName} {interview.lastName}
                </div>
              </div>
              <div className="small text-muted">
                <Moment date={interview.date} format="D/M/YY" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewsLatestWidget;
