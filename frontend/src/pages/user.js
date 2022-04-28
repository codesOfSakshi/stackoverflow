import React,{useState} from 'react';
import Profile from '../components/user/ProfileView'
import ProfileTab from '../components/user/ProfileTab'
import ActivityTab from '../components/user/ActivityTab'



function User() {

    const [tabSelected,setTabSelected] = useState("profile");


    const changeTab = (tabName)=>{
        setTabSelected(tabName);
    }

    return (
        <div>
            <div><h1>Headers</h1></div>
            <Profile/>
            <nav>
                <ul className="s-navigation">
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