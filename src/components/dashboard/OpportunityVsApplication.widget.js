import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import BorderSpinnerLoader from "../loaders/BorderSpinner.loader";
import NoResultWiget from "./NoResult.widget";


const OpportunityVsAppliactionWidget = ({ jobs }) => {
   const opportunities = useSelector(
     (state) => state.opportunitiesState.allOpportunities
   );
  let [dataLabels, setDataLabels] = useState([]);
  let [dataFields, setDataFields] = useState([]);
  let [finalColorList, setFinalColorList] = useState([]);

  useEffect(() => {
    if (opportunities) {
      setDataLabels(opportunities?.map((opportunity) => opportunity.title));
      setDataFields(opportunities?.map((opportunity) => opportunity.applications.length));
    }
  }, [opportunities]);

  useEffect(() => {
    if (dataFields.length > 0) setFinalColorList(randomColors());
  }, [dataFields]);

  function randomColors() {
    const colorList = [];
    const list = [
      "#5AA0E8",
      "#60BD32",
      "#E5945D",
      "#E8CD5A",
      "#0C4888",
      "purple",
      "pink",
      "orange",
    ];
    for (let i = 0; i < dataLabels?.length; i++) {
      let colorPicked = list[Math.ceil(Math.random() * 10)];
      colorList.push(colorPicked);
    }

    return colorList;
  }

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: "Opportunities",
        data: dataFields,
        // backgroundColor: "#CFD7FA",
        backgroundColor: finalColorList,
        barPercentage: 0.3,
        fill: false,
        tension: 0.5,
        borderColor: "#B2C5DA",
        borderRadius: 2,
      },
      
    ],
  };
  return (
    <div className="usr_card">
      <div className="d-flex align-items-center justify-content-between border-bottom dash_block">
        <div className="dashtableHead">Opportunity vs Applications</div>
        <span className="material-icons">more_horiz</span>
      </div>
      {!opportunities ? (
        <BorderSpinnerLoader />
      ) : opportunities.length > 0 ? (
        <>
          <div className="dash-300 px-3 hide-scrollbar">
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    backgroundColor: "#262B40",
                  },
                },

                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: true,
                    beginAtZero: false,
                  },
                },
              }}
            />
          </div>
        </>
      ) : (
        <NoResultWiget text={"  You have not posted any opportunities"} />
      )}
    </div>
  );
};

export default OpportunityVsAppliactionWidget;
