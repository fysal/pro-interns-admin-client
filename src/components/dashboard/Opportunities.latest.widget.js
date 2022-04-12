import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import clsx from "clsx";
import NoResultWiget from "./NoResult.widget";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";

const OpportunitiesListWidget = () => {
    const opportunities = useSelector(state => state.opportunitiesState.allOpportunities?.slice(0,6)) ?? [];
  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom py-3 px-4">
        <div className="dashtableHead">Recent Opportunities</div>
        <Link className="dash_lnk" to="/admin/opportunities">
          View all
        </Link>
      </div>
      <div className="opp_table hide-scrollbar  ">
        {!opportunities ? (
          <BorderSpinnerLoader />
        ) : opportunities.length > 0 ? (
          <Table className="" aria-label="simple table">
            <TableHead className="bg-light">
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Entry Level</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunities?.map((opportunity, index) => (
                <TableRow key={opportunity._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{opportunity.title}</TableCell>
                  <TableCell>
                    <Moment date={opportunity.createdAt} format="d/M/Y" />
                  </TableCell>
                  <TableCell>
                    <Moment date={opportunity.deadline} format="d/M/Y" />
                  </TableCell>
                  <TableCell>{opportunity.entryLevel}</TableCell>
                  <TableCell className="text-capitalize small">
                    {opportunity.location}
                  </TableCell>
                  <TableCell className="text-capitalize small">
                    {opportunity.salaryType}
                  </TableCell>
                  <TableCell className="text-capitalize small">
                    <span
                      className={clsx(
                        opportunity.jobStatus === "open"
                          ? "text-success"
                          : "text-danger"
                      )}
                    >
                      {opportunity.jobStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoResultWiget text="There are no opportunities available" />
        )}
      </div>
    </div>
  );
};

export default OpportunitiesListWidget;
