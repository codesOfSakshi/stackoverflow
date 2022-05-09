import {Card,Col,Row,Badge} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { useLocation } from 'react-router-dom';

export default function UserCard(props) {  
    const location = useLocation();

useEffect(() => {
    
},[])

return (<>{props.user && <div class="s-user-card s-user-card__highlighted" style={{
    width: "min-content",
    float: "right"}}>
    <time class="s-user-card--time">
    {props.date &&<ReactTimeAgo date={Date.parse(props.date)} locale="en-US" />}</time>
    <a href="…" class="s-avatar s-avatar__32 s-user-card--avatar">
        <img class="s-avatar--image" src={props.user.profilePicture}/>
    </a>
    <div class="s-user-card--info">
        <a href="…" class="s-user-card--link">{props.user.name}</a>
        <ul class="s-user-card--awards">
            <li class="s-user-card--rep">{props.user.reputation}</li>
            <li class="s-award-bling s-award-bling__gold">…</li>
            <li class="s-award-bling s-award-bling__silver">…</li>
            <li class="s-award-bling s-award-bling__bronze">…</li>
        </ul>
    </div>
</div>}</>)}
