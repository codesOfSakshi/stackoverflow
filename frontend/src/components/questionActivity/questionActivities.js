import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../config/axios.config";
import {axiosInstance as authapi} from '../../services/authaxiosservice';
import { constants } from "../../config/config";
import "./questionActivity.css";

const QuestionActivity = ({ }) => {
  const { activityID } = useParams();
  const [activities, setActivities] = useState();
  const [timeToggle, setTimeToggle] = useState(true);
  const getActivities = () => {
    if (activityID) {
      authapi.get(
        constants.baseUrl +
          constants.API.ACTIVITY.getActivity.replace(":activityID", activityID)
      ).then(
        (res) => {
          if (res && res.data && res.data.success == true) {
            // console.log("RECIEVED DATA", res.data.result[0].activities);
            console.log(res.data.result);
            res.data.result[0].activities?.reverse();
            setActivities([...res.data.result[0].activities]);
            console.log("SORTED DATA", activities);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  useEffect(getActivities, []);
  const getTimeSince = (createdAt) => {
    let delta = (new Date() - new Date(Date.parse(createdAt))) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let displayDate = "";
    if(days){
        displayDate+= days.toString() + " days ago"
    }else if(hours){
        displayDate+= hours.toString() + " hours ago"
    }else if(minutes){
        displayDate+= minutes.toString() + " minutes ago"
    }
    return displayDate;
  };
  const Answer = ({ activity }) => (
    <tr
      class="datehash-1860736401"
      data-datehash="1860736401"
      data-eventtype="answer"
      data-eventid="72164866"
    >
      <td class="ws-nowrap creation-date">
        <a href="#answer_72164866">
          <span title="2022-05-08 20:29:06Z" class="relativetime">
            {timeToggle?getTimeSince(activity?.createdAt):activity?.createdAt}
          </span>
        </a>
      </td>
      <td class="ws-nowrap event-type">
        <span class="event-type answer-type">answer</span>
      </td>
      <td class="wmn1">
        <span></span>
      </td>
      <td class="ws-nowrap">
        <span>
          <a href="/users/2877241/vlad-from-moscow">{activity?.by}</a>
        </span>
      </td>
      <td class="ws-nowrap">
        <span></span>
      </td>
      <td class="event-comment">
        <span>
          <span>{activity?.comment}</span>
        </span>
      </td>
    </tr>
  );

  const Comment = ({activity}) => (
    <tr
      class="datehash-1042453665"
      data-datehash="1042453665"
      data-eventtype="comment"
      data-eventid="127504140"
    >
      <td class="ws-nowrap creation-date">
        <a href="#comment_127504140">
          <span title="2022-05-08 20:27:47Z" class="relativetime">
            {timeToggle?getTimeSince(activity?.createdAt):activity?.createdAt}
          </span>
        </a>
      </td>
      <td class="ws-nowrap event-type">
        <span class="event-type comment">comment</span>
      </td>
      <td class="wmn1">
        <span>
          <a href="/posts/comments/127504140">added</a>
        </span>
      </td>
      <td class="ws-nowrap">
        <span>
          <a href="/users/3943312/sam-varshavchik" class="comment-user ">
            {activity?.by}
          </a>
        </span>
      </td>
      <td class="ws-nowrap">
        <span></span>
      </td>
      <td class="event-comment">
        <span>
          {activity?.comment}
        </span>
      </td>
    </tr>
  );

  const History = ({ activity }) => (
    <tr
      class="datehash--127427248"
      data-datehash="-127427248"
      data-eventtype="history"
      data-eventid="52385c2e-ea3b-4a96-b259-8d903c5e790f"
    >
      <td class="ws-nowrap creation-date">
        <a href="#history_52385c2e-ea3b-4a96-b259-8d903c5e790f">
          <span title="2022-05-08 20:25:49Z" class="relativetime">
            {timeToggle?getTimeSince(activity?.createdAt):activity?.createdAt}
          </span>
        </a>
      </td>
      <td class="ws-nowrap event-type">
        <span class="event-type history">history</span>
      </td>
      <td class="wmn1">
        <span >
        <span class={(activity?.comment!="asked")?"expander-arrow-small-hide js-load-revision":""}>{activity?.comment}</span>
        </span>
      </td>
      <td class="ws-nowrap">
        <span>
          <a href="/users/3764804/bullywiiplaza" class="comment-user owner">
            {activity?.by}
          </a>
        </span>
      </td>
      <td class="ws-nowrap">
        <span>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            title="CC License version used for this revision"
          >
            CC BY-SA 4.0
          </a>
        </span>
      </td>
      <td class="event-comment">
        <span></span>
      </td>
    </tr>
  );

  return (
    <div>
      {activityID && (
        <div>
          <div id="content" class="mainbar-full post-timeline-v2">
            {/* <div class="subheader mb16 d-flex fd-column h-auto">
              <h1 class="flex--item">
                Timeline for{" "}
                <a
                  href="/questions/72164839/why-is-appending-an-int-to-a-stdstring-undefined-behavior-with-no-compiler-war"
                  class="question-hyperlink"
                >
                  Why is appending an int to a std::string undefined behavior
                  with no compiler warning in C++?
                </a>
              </h1>
              <h3 class="flex--item">
                Current License:{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                >
                  CC BY-SA 4.0
                </a>
              </h3>
            </div> */}

            <div class="mb16 fw-bold fs-body2">{activities?.length} events</div>

            <table class="post-timeline s-table s-table__bx">
              <thead>
                <tr>
                  <th>
                    when&ensp;
                    <a class="js-toggle-date-format" onClick={()=>setTimeToggle(!timeToggle)}>toggle format</a>
                  </th>
                  <th class="event-type">what</th>
                  <th></th>
                  <th>by</th>
                  <th>license</th>
                  <th>comment</th>
                </tr>
              </thead>
              <tbody class="event-rows fs-body">
                {activities &&
                  activities.map((x) => {
                    console.log(x);
                    if (x.type === "history") {
                      return <History activity={x} />;
                    } else if (x.type == "comment") {
                      return <Comment activity={x} />;
                    } else if (x.type == "answer") {
                      return <Answer activity={x} />;
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!activityID && <p>No activityID Present</p>}
    </div>
  );
};

export default QuestionActivity;
