import AdminMenu from "../components/menus/AdminMenu";
import Navbar from "../components/menus/Navbar";
import "../pages/css/adminStyles.css";
const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="dashboard-container">
        <div className="side_bar">
          <AdminMenu />
        </div>
        <div className="c-wrapper">
          <Navbar />
          <div className="content"> {children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
