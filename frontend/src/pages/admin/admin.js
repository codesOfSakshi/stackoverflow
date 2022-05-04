import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTag from "../../components/admin/AddTag.js";
import Analytics from "../../components/admin/Analytics.js";
import ReviewQuestions from "../../components/admin/ReviewQuestions.js";
import { constants } from "../../config/config.js";
import "./admin.js";

const Admin = () => {
  const [tabSelected, setTabSelected] = useState("analytics");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const changeTab = (tabName) => {
    setTabSelected(tabName);
  };

  // TODO: Uncomment when redux is implemented.
  // useEffect(()=>{
  //   if(!user.admin){
  //     navigate(constants.PAGES.home);
  //   }
  // }, [])

  return (
    <div className="d-flex" style={{marginTop: "20px"}}>
      <div className="flex--item">
      <nav>
            <ul class="s-navigation s-navigation__vertical">
                <li><a onClick={()=>{changeTab("analytics")}} className={"s-navigation--item"+( tabSelected==="analytics" ? " is-selected":"")}>Analytics</a></li>
                <li><a onClick={()=>{changeTab("reviewQuestions")}} className={"s-navigation--item"+( tabSelected==="reviewQuestions" ? " is-selected":"")}>Review Questions</a></li>
                <li><a onClick={()=>{changeTab("addTag")}} className={"s-navigation--item"+( tabSelected==="addTag" ? " is-selected":"")}>Add Tag</a></li>
            </ul>
        </nav>
      </div>
      <div className="flex--item fl-grow1">
        {tabSelected === "analytics" && <Analytics />}
        {tabSelected === "reviewQuestions" && <ReviewQuestions />}
        {tabSelected === "addTag" && <AddTag />}
      </div>
    </div>
  );
};

export default Admin;
