import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Avatar,
} from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import countryList from "../../utils/countries.json";
import BorderSpinner from "../loaders/BorderSpinner.loader";
import CircularProgressWidget from "./CircularProgress.widget";


const InternsWidget = () => {
  const dispatch = useDispatch();
  const interns = useSelector((state) =>
    state.internsState?.interns?.slice(0, 10)
  );
  
  return (
    <div className="bg-white rounded">
      <div className="dash_block border-bottom">
        <div className="dashtableHead text-capitalize">Latest interns</div>
      </div>
      <div className="dash-400 hide-scrollbar"> {interns ? (
        <>
          <ListView interns={interns} />
        </>
      ) : (
        <BorderSpinner text="Loading. Please wait" />
      )}</div>
     
    </div>
  );
};

export default InternsWidget;

export const TableView = ({ interns }) => {
  return (
    <TableContainer>
      <Table className="acc_table small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="small">
              <span className="small">Full Name</span>
            </TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interns?.map((intern) => (
            <TableRow key={intern._id}>
              <TableCell>
                <div className="d-flex align-items-center">
                  <Avatar className="usr_tn_avatar me-2" src={intern.avatar}>
                    {intern.firstName.substring(0, 1)}
                  </Avatar>
                  <div className="">
                    {intern.firstName} {intern.lastName}
                  </div>
                </div>
              </TableCell>
              <TableCell>{intern.gender || "N/A"}</TableCell>
              <TableCell>
                {countryList?.filter(
                  (country) => country.code === intern.nationality
                )[0]?.name || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const ListView = ({ interns }) => {
  return (
    <>
      {interns?.map((intern) => (
        <div
          className="d-flex align-items-center justify-content-between small px-3 py-2 border-bottom"
          key={intern._id}
        >
          <div className="d-flex align-items-center flex-1">
            <Avatar
              className="usr_tn_avatar avatar_secondary_light  me-2"
              src={intern.avatar}
            >
              {intern.firstName.charAt(0)}
            </Avatar>
            <div className="small">
              {intern.firstName} {intern.lastName}
            </div>
          </div>
          <div className="flex-2 small  px-4"><CircularProgressWidget value={intern.profileCompletePercentage} /></div>
          <div className="flex-2 small px-4">{intern.gender || "N/A"}</div>
          <div className="flex-2 small px-4">
            {countryList.filter(
              (country) =>
                country.code.toLowerCase() === intern.nationality.toLowerCase()
            )[0]?.name || "N/A"}
          </div>
          <div className=" small">
            <Moment date={intern.dateCreated} fromNow />
          </div>
        </div>
      ))}
    </>
  );
};
