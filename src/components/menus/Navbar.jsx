import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import navItems from "../../utils/nav.json";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { getAllEmployers } from "../../actions/employers.actions";
import { getAllApplications } from "../../actions/application.actions";
import { getAllInterns } from "../../actions/interns.action";
import { getAllOpportunities } from "../../actions/opportunities.actions";
import { getAllTransactions } from "../../actions/transactions.actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const [message] = useState();
  const [error] = useState();
  const location = useLocation();
  const pathnameLen = location.pathname.split("/").length;
  const lastLocationElem = location.pathname.split("/")[pathnameLen - 1];

  const employers = useSelector((state) => state.employersState.employers);
  const applications = useSelector(
    (state) => state.applicationsState.applications
  );
  const interns = useSelector((state) => state.internsState.interns);
  const opportunities = useSelector(
    (state) => state.opportunitiesState.opportunities
  );
  const transactions = useSelector( state => state.transactionsState.transactions);

  useEffect(() => {
    if (!employers) dispatch(getAllEmployers());
    if (!applications) dispatch(getAllApplications());
    if (!interns) dispatch(getAllInterns());
    if (!opportunities) dispatch(getAllOpportunities());
    if(!transactions) dispatch(getAllTransactions());
  }, []);


  return (
    <>
      <div className="sticky-top admin_menu">
        <div className="c-header">
          <div className="c-header-toggle">
            <span className="material-icons-outlined">menu</span>
            <div className="c-header-menu">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink to={item.path}>{item.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="position-relative">
            <div className="d-flex  align-items-center justify-content-center">
              <div className="position-relative">
                <NavLink to="/admin/notifications">
                  <div className="d-flex me-3 text-muted position-relative">
                    <span className="material-icons-outlined">
                      notifications
                    </span>
                  </div>
                </NavLink>
              </div>

              <Avatar />
            </div>
          </div>
        </div>
        <div className="c-breadcrumb">
          <div className="crumbs">
            Home / <span>{lastLocationElem}</span>
          </div>
        </div>
        {message && <div className="alert alert-success px-4">{message}</div>}
        {error && <div className="alert alert-danger px-4">{error}</div>}
      </div>
    </>
  );
};

export default Navbar;
