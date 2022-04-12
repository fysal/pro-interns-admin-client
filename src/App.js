import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoutes from "./pages";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AdminRoutes} />
          <Route exact path="/admin/opportunities" component={AdminRoutes} />
          <Route exact path="/admin/applications" component={AdminRoutes} />
          <Route path="/admin/employers" component={AdminRoutes} />
          <Route path="/admin/users" component={AdminRoutes} />
          <Route path="/admin/interns" component={AdminRoutes} />
          <Route path="/admin/interviews" component={AdminRoutes} />
          <Route path="/admin/blogs" component={AdminRoutes} />
          <Route path="/admin/partners" component={AdminRoutes} />
          <Route path="/admin/packages" component={AdminRoutes} />
          <Route path="/admin/request-callback" component={AdminRoutes} />
          <Route path ="/admin/shortlists" component={AdminRoutes} />
          <Route path="/admin/opportunity/add" component={AdminRoutes} />
          <Route path="/admin/employer/add" component={AdminRoutes} />
          <Route path="/admin/intern/add" component={AdminRoutes} />
          <Route path="/admin/transactions" component={AdminRoutes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
