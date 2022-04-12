import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import line from "../../assets/image/2332020.png";

const Statistics = () => {
  const opportunities = useSelector(
    (state) => state.opportunitiesState.allOpportunities
  );
  const employers = useSelector((state) => state.employersState.count);
  const applications = useSelector(
    (state) => state.applicationsState.applications
  );
  const interns = useSelector((state) => state.internsState.interns);

  return (
    <div className="row">
      <Grid
        total={opportunities?.length}
        text="Opportunities"
        extraClass="bg-gradient-primary"
        icon="account_circle"
        link="/admin/opportunities"
      />
      <Grid
        total={employers}
        text="Employers"
        extraClass="bg-gradient-info"
        icon="settings"
        link="/admin/employers"
      />
      <Grid
        total={applications?.length}
        text="Applications"
        extraClass="bg-gradient-warning"
        icon="data_exploration"
        link="/admin/applications"
      />
      <Grid
        total={interns?.length}
        text="Interns"
        extraClass="bg-gradient-danger"
        icon="verified"
        link="/admin/applications"
      />
      
    </div>
  );
};

export default Statistics;

export const Grid = ({ total, text, extraClass, icon, link }) => {
  return (
    <>
      <div className="col-sm-12 col-md-3">
        {!total ? (
          <div className="d-flex align-items-center justify-content-center">
            <div
              class="spinner-border spinner-border-md text-primary"
              role="status"
            ></div>
          </div>
        ) : (
          <div
            className={clsx("statistic_card text-white", extraClass)}>
            <div className="card-body pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="text-value-lg">{total}</div>
                <div className="text-value-md">{text}</div>
              </div>
              <div className="btn-group">
                <span
                  className="material-icons-outlined"
                  style={{ opacity: "0.7" }}
                >
                  {icon}
                </span>
              </div>
            </div>
            <div className="c-chart-wrapp pt-3">
              <Link
                to={link}
                className="d-flex align-items-center"
                style={{
                  backgroundColor: "#fff",
                  inlineSize: "max-content",
                  color: "#000",
                  borderRadius: "8px",
                  padding: "3px 8px",
                  boxShadow: "0 3px 2px rgb(0 0 0 / 10%)",
                  textTransform: "capitalize",
                  marginLeft: "17px",
                }}
              >
                <span style={{ fontSize: "9px" }}>View all</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
