import {Card,Col,Row,Badge} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import { useLocation } from 'react-router-dom'

function SideNav(props) {  
    const location = useLocation();

useEffect(() => {
    
},[])

return (
    <div style={{marginLeft:"5rem"}}>
    <a class="s-block-link" href="/question">Questions</a>
    <a class="s-block-link" href="/tags">Tags</a>
    <a class="s-block-link" href="/users">Users</a>
</div>
)}

export default  SideNav;