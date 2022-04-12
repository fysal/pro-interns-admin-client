import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";
import NoResultWidget from "../../components/dashboard/NoResult.widget";
import { Link } from "react-router-dom";

const TransactionPieWidget = () => {
  const transactions = useSelector(
    (state) => state.transactionsState.transactions
  );

  const [plans, setPlans] = useState({ proBasic: 0, proPlus: 0, bespoke: 0 });

  useEffect(() => {
    if (transactions) {
      transactions.forEach((transaction) => {
        if (transaction.package.title.toLowerCase() === "pro basic")
          setPlans({ ...plans, proBasic: plans.proBasic++ });
        else if (transaction.package.title.toLowerCase() === "pro plus")
          setPlans({ ...plans, proPlus: plans.proPlus++ });
        else setPlans({ ...plans, bespoke: plans.bespoke++ });
      });
    }
  }, [transactions]);

  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom dash_block">
        <div className="dashtableHead">Subscriptions per plan</div>
        <Link className="dash_lnk" to="/admin/transactions">
          View all
        </Link>
      </div>
      {!transactions ? (
        <BorderSpinnerLoader />
      ) : transactions?.length > 0 ? (
        <>
          <div className="pie-wraper-2 dash-400 hide-scrollbar">
            <Doughnut
              data={{
                labels: ["Pro Basic", "Pro Plus", "Bespoke"],
                datasets: [
                  {
                    data: [plans.proBasic, plans.proPlus, plans.bespoke],
                    backgroundColor: ["#FF6687", "#4ED8D8", "#37AFFF"],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "left",

                    labels: {
                      boxWidth: 15,
                      boxHeight: 15,
                    },
                  },
                  tooltip: {
                    backgroundColor: "#262B40",
                  },
                },
              }}
              width={100}
              height={50}
            />
          </div>
        </>
      ) : (
        <NoResultWidget text={"You have not posted any opportunities"} />
      )}
    </div>
  );
};

export default TransactionPieWidget;
