import {useEffect} from 'react';
import './atom.css';
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