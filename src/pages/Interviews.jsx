import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllInterviews } from "../actions/interviews.actions";
import Moment from "react-moment";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";

const Interviews = () => {
  const dispatch = useDispatch();

  const pendingInterviewsFromState = useSelector(
    (state) => state.interviewsState.pending
  );
  const completedInterviewsFromState = useSelector(
    (state) => state.interviewsState.completed
  );
  const canceledInterviewsFromState = useSelector(
    (state) => state.interviewsState.canceled
  );
  const [interviews, setinterviews] = useState({
    pending: pendingInterviewsFromState,
    completed: completedInterviewsFromState,
    canceled: canceledInterviewsFromState,
  });

  useEffect(() => {
    if (
      !pendingInterviewsFromState ||
      !completedInterviewsFromState ||
      canceledInterviewsFromState
    )
      dispatch(getAllInterviews());
    else
      setinterviews({
        pending: pendingInterviewsFromState,
        completed: completedInterviewsFromState,
        canceled: canceledInterviewsFromState,
      });
  }, []);
  const onSearch = () => {};
  return (
    <>
      <Helmet title={`Interview | ${process.env.REACT_APP_TAGLINE}`} />

      <div className="int_br">
        {!pendingInterviewsFromState ? (
          <BorderSpinnerLoader />
        ) : (
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between pd mb-3">
                <h6>
                  Pending
                  <span className="text-info info ms-1">
                    {pendingInterviewsFromState?.length}
                  </span>
                </h6>
                <span className="material-icons-outlined">search</span>
              </div>
              {pendingInterviewsFromState?.map((interview) => (
                <Card interview={interview} key={interview._id} />
              ))}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between cmp mb-3">
                <h6>
                  Completed
                  <span className="text-success sus ms-1">
                    {completedInterviewsFromState?.length}
                  </span>
                </h6>
                <span className="material-icons-outlined">search</span>
              </div>
              {completedInterviewsFromState?.map((interview) => (
                <Card interview={interview} key={interview._id} />
              ))}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between cd mb-3">
                <h6>
                  Canceled
                  <span className="text-danger com ms-1">
                    {canceledInterviewsFromState?.length}
                  </span>
                </h6>{" "}
                <span className="material-icons-outlined">search</span>
              </div>
              {canceledInterviewsFromState?.map((interview) => (
                <Card interview={interview} key={interview._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Interviews;

export const Card = ({ interview }) => {
  return (
    <div className="p-3 bg-white inter_Card">
      <span className="material-icons-outlined float-end pointer">
        more_vert
      </span>
      <div className="__cand_">
        {interview.firstName} {interview.lastName}
      </div>
      <div className="in_jb">{interview.opportunity}</div>
      <div className="in_empl">{interview.employer}</div>
      <div className="int_tm mt-1">
        <Moment date={interview.date} format="D/M/Y" />
      </div>
      <span className="comment-d _info_light mt-2">
        <span className="d-flex align-items-center">
          <span className="material-icons-outlined small me-1">comment</span>
          <span className="small">Comment</span>
        </span>
      </span>
    </div>
  );
};
