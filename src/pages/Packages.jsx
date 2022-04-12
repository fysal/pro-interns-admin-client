import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscriptionPlans } from "../actions/subscription.plans.actions";
import BorderSpinnerLoader from "../components/loaders/BorderSpinner.loader";
const Packages = () => {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "UGX",
  });
  const dispatch = useDispatch();
  const plansFromState = useSelector(
    (state) => state.subscriptionPlanState.plans
  );
  console.log(plansFromState);
  useEffect(() => {
    if (!plansFromState) dispatch(getAllSubscriptionPlans());
  }, []);
  return (
    <>
      {!plansFromState ? (
        <BorderSpinnerLoader />
         
      ) : (
        <div className="bg-white">
          <h6 className="py-3 px-4 border-bottom">Packages</h6>
          <div className="row">
            {plansFromState.map((plan, index) => (
              <div
                className="col-sm-12 col-md-4 __package_blocks"
                key={index}
              >
                <div className="p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="__package text-uppercase">{plan.name}</div>
                    <span className="material-icons-outlined __icn">edit</span>
                  </div>
                  <div className="small  mb-2">{plan.shorts}</div>
                  <div className="__price">{formatter.format(plan.price)}</div>
                  <div className="__discount">
                    {plan.discount === 0 ? (
                      <div className="small text-muted mt-1">No discount</div>
                    ) : (
                      `Discount ${formatter.format(plan.discount)}`
                    )}
                  </div>
                  <div className="__desc">{plan.description}</div>
                  {plan.attributes.length > 0 && (
                    <ul>
                      <li>{plan.totalPosts} Opportunity posts</li>
                      {plan.attributes?.map((attr, index) => (
                        <li key={index}>{attr}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;
