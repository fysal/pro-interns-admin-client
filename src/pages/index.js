import { Route} from "react-router-dom";
import AdminLayouts from "../layouts/AdminLayout";
import Applications from "./Applications";
import Dashboard from "./Dashboard";
import Employers from "./Employers";
import Opportunities from "./Opportunities";
import Users from "./Users";
import Interns from './Interns';
import Interviews from "./Interviews";
import Blogs from './Blogs';
import Partners from "./Partners";
import Packages from "./Packages";
import RequestCallback from "./RequestCallback";
import Shortlists from "./Shortlists";
import AddOpportunity from '../components/forms/Opportunity.form';
import AddEmployer from '../components/forms/AddEmployer';
import AddIntern from '../components/forms/AddIntern.form';
import Transactions from "./Transactions";

const AdminRoutes = () => {
  return (
    <AdminLayouts>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/admin/opportunities" component={Opportunities} />
        <Route path="/admin/applications" component={Applications} />
        <Route path="/admin/employers" component={Employers} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/interns" component={Interns} />
        <Route path="/admin/interviews" component={Interviews} />
        <Route path="/admin/blogs" component={Blogs} />
        <Route path="/admin/partners" component={Partners} />
        <Route path="/admin/packages" component={Packages} />
        <Route path="/admin/request-callback" component={RequestCallback} />
        <Route path="/admin/shortlists" component={Shortlists} />
        <Route path="/admin/opportunity/add" component={AddOpportunity} />
        <Route path="/admin/employer/add" component={AddEmployer} />
        <Route path="/admin/intern/add" component={AddIntern} />
        <Route path="/admin/transactions" component={Transactions} />
    </AdminLayouts>
  );
};

export default AdminRoutes;
