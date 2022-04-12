import React from "react";
import { useSelector } from "react-redux";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";
import NoResultWiget from "./NoResult.widget";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";

const TransactionsLatestWidget = () => {
  const transactions = useSelector(
    (state) => state.transactionsState.transactions
  )?.slice(0, 10);
  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom dash_block">
        <div className="dashtableHead">Latest transactions</div>
        <Link className="dash_lnk" to="/admin/transactions">
          View all
        </Link>
      </div>
      {!transactions ? (
        <BorderSpinnerLoader />
      ) : transactions.length < 1 ? (
        <NoResultWiget />
      ) : (
        <div className="hide-scrollbar dash-300">
          {transactions.map((transaction) => (
            <div
              className="d-flex align-items-cener justify-content-between small px-3 py-2 border-bottom"
              key={transaction._id}
            >
              <div>
                <div className="d-flex align-items-start justify-content-between flex-1 text-capitalize">
                  <Avatar
                    src={transaction.employer.avatar}
                    className="usr_tn_avatar avatar_secondary_light  me-2"
                  >
                    {transaction.employer.employerName.charAt(0)}
                  </Avatar>
                  <div >
                    <div className="small" style={{fontWeight: "400"}}>{transaction.employer.employerName}</div>
                    <div className="small">
                      {transaction.amount} {transaction.currency}
                    </div>
                    <div className="small">
                      {transaction.paymentOption === "mobilemoneyug"
                        ? "Mobile Money"
                        : transaction.paymentOption}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-capitalize mb-2 small" style={{ fontWeight: "400" }}>{transaction.package.title}</div>
                <div
                  className={clsx(
                    "small text-capitalize",
                    transaction.status === "successful"
                      ? "text-success"
                      : transaction.status === "pending"
                      ? "text-info"
                      : "text-danger"
                  )}
                >
                  {transaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsLatestWidget;
