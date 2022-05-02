import React,{useState} from 'react';
import Profile from '../components/user/ProfileView'
import ProfileTab from '../components/user/ProfileTab'
import ActivityTab from '../components/user/ActivityTab'
import "../styles/user.css";



function User() {

    const [tabSelected,setTabSelected] = useState("profile");


    const changeTab = (tabName)=>{
        setTabSelected(tabName);
    }

    return (

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

    )
}

export default User