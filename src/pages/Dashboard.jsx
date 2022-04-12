import Statistics from "../components/dashboard/Statistics.widget";
import InternWidget from '../components/dashboard/Interns.widget';
import EmployerWidgt from '../components/dashboard/Employer.widget';
import PieChartOpenVsClosed from "../components/dashboard/Opp.open.vs.closed";
import OpportunityVsApplication from '../components/dashboard/OpportunityVsApplication.widget';
import OpportunitiesLatestWidget from '../components/dashboard/Opportunities.latest.widget';
import TransactionsLatestWidget from "../components/dashboard/Transactions.latest.widget";
import { Helmet } from "react-helmet";
import TransactionPieWidget from "../components/dashboard/TransactionPie.widget";
import InterviewsLatest from "../components/dashboard/Interviews.latest.widget";

const Dashboard = () => {
  return (
    <>
      <Helmet title={`Dashboard | ${process.env.REACT_APP_TAGLINE}`} />
      <div className="dashboard">
        <div className="mb-4">
          <Statistics />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <PieChartOpenVsClosed />
          </div>
          <div className="col-sm-12 col-md-6">
            <OpportunityVsApplication />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <TransactionsLatestWidget />
          </div>
          <div className="col-sm-12 col-md-4">
            <TransactionPieWidget />
          </div>
          <div className="col-sm-12 col-md-4"><InterviewsLatest/></div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <OpportunitiesLatestWidget />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <InternWidget />
          </div>
          <div className="col-sn-12 col-md-6 mb-3">
            <EmployerWidgt />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
