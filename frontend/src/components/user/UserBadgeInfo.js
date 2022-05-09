import React, {useEffect, useState} from 'react';
import UserBadge from './UserBadge.js';
import '../../styles/badgeinfo.css';
import GoldBadge from "./GoldBadge";
import SilverBadge from "./SilverBadge";
import BronzeBadge from "./BronzeBadge";
import {useParams} from "react-router-dom";
import axiosService from "../../services/axiosservice";

const UserBadgeInfo = () => {
    const [badges, setBadges] = useState([]);
    const [gold, setGold] = useState([]);
    const [silver, setSilver] = useState([]);
    const [bronze, setBronze] = useState([]);

    const GET_USER_API = "api/tags/badges/";
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(userId)
    const getUser = async () => {

        try{
            const response = await axiosService.get(GET_USER_API+userId);
            console.log(response)
            if(response && response.data){
                console.log(response.data.tags[0][0])
                if(response.data.tags) {
                    setBadges(response.data.tags);
                    console.log(badges)
                    let gbadge = response.data.tags.filter(badge=> badge[1] === "Gold")
                    setGold(gbadge)
                    let sbadge = response.data.tags.filter(badge=> badge[1] === "Silver")
                    setSilver(sbadge)
                    let bbadge = response.data.tags.filter(badge=> badge[1] === "Bronze")
                    setBronze(bbadge)
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    },[]);

  return (
        <div className="profiletab-item-userbadgeinfo-container badgeinfo-container">
            <div className="badgeinfo-title">
                  Badges
            </div>
            <div className="badgeinfo-data-outer-container">
            <GoldBadge badge={gold}/>
            <SilverBadge badge={silver}/>
            <BronzeBadge badge={bronze}/>
            </div>
        </div>
  )
}

export default UserBadgeInfo