import React from "react";
import { useSelector }  from 'react-redux';
import "chart.js/auto";
import { Pie, Doughnut} from "react-chartjs-2";
import { Link } from "react-router-dom";
import NoResultWidget from "./NoResult.widget";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";



const PieChartOpenVsClosed = () => {
    const opportunities = useSelector(
      (state) => state.opportunitiesState.allOpportunities
    );

  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom dash_block">
        <div className="dashtableHead">Opportunities: Open vs Closed</div>
        <Link className="dash_lnk" to="/employer/opportunities">
          View all
        </Link>
      </div>
      {!opportunities ? (
        <BorderSpinnerLoader />
      ) : opportunities?.length > 0 ? (
        <>
          <div className="pie-wraper-2 dash-00 hide-scrollbar">
            <Pie
              data={{
                labels: ["Open", "Closed"],
                datasets: [
                  {
                    data: [
                      opportunities?.filter(
                        (opportunity) => opportunity.jobStatus === "open"
                      ).length,
                      opportunities?.filter(
                        (opportunity) => opportunity.jobStatus === "closed"
                      ).length,
                    ],
                    backgroundColor: ["#FF6687", "#4ED8D8", "#37AFFF"],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "right",

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

export default PieChartOpenVsClosed;
