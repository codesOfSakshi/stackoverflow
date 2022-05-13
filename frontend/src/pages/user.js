import React,{useState} from 'react';
import Profile from '../components/user/ProfileView'
import ProfileTab from '../components/user/ProfileTab'
import ActivityTab from '../components/user/ActivityTab'
import "../styles/user.css";
import Navbar from '../components/user/Navbar';
import SideNav from '../Atom/SideNav';
import {Row, Col} from 'react-bootstrap';


function User() {

    const [tabSelected,setTabSelected] = useState("profile");


    const changeTab = (tabName)=>{
        setTabSelected(tabName);
    }

    return (

        <div>
            <Navbar/>
            <Row>
            <Col md={1} sm={1} lg={1}>
                <br/><br/><br/>
            <SideNav/>
            </Col>
            <Col md={10} sm={10} lg={10}>
                <br/>
                <div className="snippet-hidden mt48 mr48 mb48 ml48">
                    <Profile/>

                    <nav className="user-nav">
                        <ul className="s-navigation user-nav-options">
                            <li onClick={()=>{changeTab("profile")}}><a className={"s-navigation--item"+( tabSelected==="profile" ? " is-selected":"")}>Profile</a></li>
                            <li onClick={()=>{changeTab("activity")}}><a className={"s-navigation--item"+( tabSelected==="activity" ? " is-selected":"")}>Activity</a></li>
                        </ul>
                    </nav>
                    {
                        tabSelected==="profile" && <ProfileTab/>
                    }
                    {
                        tabSelected==="activity" && <ActivityTab/>
                    }
                </div>
            </Col>
            </Row>
        </div>


    )
}

export default User