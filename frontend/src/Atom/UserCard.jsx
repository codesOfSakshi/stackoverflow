import {Card,Col,Row,Badge} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { useLocation } from 'react-router-dom';
import { constants } from "../config/config";
import {axiosInstance as authapi} from '../services/authaxiosservice';

export default function UserCard(props) {  
    const location = useLocation();
    const userID = props.user._id;
  const GETBADGES = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/tags/badges/${userID}`;
  const [bronzeTags, setBronzeTags] = useState(0);
  const [silverTags, setSilverTags] = useState(0);
  const [goldTags, setGoldTags] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
    authapi
    .get(GETBADGES)
    .then((response) => {
      if (response && response.data) {
        if (response.data.tags) {
          let gbadge = response.data.tags.filter(
            (badge) => badge[1] === "Gold"
          );
          setGoldTags(gbadge.length);
          let sbadge = response.data.tags.filter(
            (badge) => badge[1] === "Silver"
          );
          setSilverTags(sbadge.length);
          let bbadge = response.data.tags.filter(
            (badge) => badge[1] === "Bronze"
          );
          setBronzeTags(bbadge.length);
        }
      }
    })
    .catch((error) =>
      console.log(
        "There was an error while getting the badges and the error is \n",
        error
      )
    );
},[])

const navaigateToUser=() =>{
    const path = "/user/"+props.user._id
    navigate(path)
}

return (<>{props.user && <div class="s-user-card s-user-card__highlighted" style={{
    width: "min-content",
    float: "right"}}
    onClick={navaigateToUser}>
    <time class="s-user-card--time">
    {props.date &&<ReactTimeAgo date={Date.parse(props.date)} locale="en-US" />}</time>
    <a href="…" class="s-avatar s-avatar__32 s-user-card--avatar">
        <img class="s-avatar--image" src={props.user.profilePicture}/>
    </a>
    <div class="s-user-card--info" onClick={navaigateToUser}>
        <div onClick={navaigateToUser}>{props.user.name}</div>
        <ul class="s-user-card--awards">
            <li class="s-user-card--rep">{props.user.reputation}</li>
            <li class="s-award-bling s-award-bling__gold">{goldTags}</li>
            <li class="s-award-bling s-award-bling__silver">{silverTags}</li>
            <li class="s-award-bling s-award-bling__bronze">{bronzeTags}</li>
        </ul>
    </div>
</div>}</>)}
