import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";

const QuestionActivity = () => {
  const { activityID } = useParams();
  const [activities, setActivities] = useState();
  const getActivities = () => {
    if (activityID) {
      axiosApi(
        constants.baseUrl + constants.API.ACTIVITY.getActivity.replace(":activityID", activityID)
      ).then(
        (res) => {
            if(res && res.data && res.data.success == true){
                console.log(res.data.result[0]);
                setActivities(res.data.result);
            }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  useEffect(getActivities, []);
  return (
    <div>
      {activityID && <p>QUESTION ACTIVITY:{activityID}</p>}
      {!activityID && <p>No activityID Present</p>}
    </div>
  );
};

export default QuestionActivity;
