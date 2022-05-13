import React, {useEffect, useState} from 'react';
import UserBadge from './UserBadge.js';
import '../../styles/badgeinfo.css';
import GoldBadge from "./GoldBadge";
import SilverBadge from "./SilverBadge";
import BronzeBadge from "./BronzeBadge";
import {useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';

const UserBadgeInfo = () => {
    const [badges, setBadges] = useState([]);
    const [gold, setGold] = useState([]);
    const [silver, setSilver] = useState([]);
    const [bronze, setBronze] = useState([]);
    const [goldLength, setGoldLength] = useState(0);
    const [silverLength, setSilverLength] = useState(0);
    const [bronzeLength, setBronzeLength] = useState(0);


    const GET_USER_API = "api/tags/badges/";
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(userId)
    const getUser = async () => {

        try{
            const response = await authapi.get(GET_USER_API+userId);
            console.log(response)
            if(response && response.data){
                console.log(response.data.tags[0][0])
                if(response.data.tags) {
                    setBadges(response.data.tags);
                    console.log(badges)
                    let gbadge = response.data.tags.filter(badge=> badge[1] === "Gold")
                    setGoldLength(gbadge.length);
                    gbadge = gbadge.filter((val,i)=>i<3)
                    setGold(gbadge)
                    let sbadge = response.data.tags.filter(badge=> badge[1] === "Silver")
                    setSilverLength(sbadge.length);
                    sbadge = sbadge.filter((val,i)=>i<3)
                    setSilver(sbadge)
                    let bbadge = response.data.tags.filter(badge=> badge[1] === "Bronze")
                    setBronzeLength(bbadge.length);
                    bbadge = bbadge.filter((val,i)=>i<3)
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
        <div className="badgeinfo-container">
            <div className="badgeinfo-title">
                  Badges
            </div>
            <div className="badgeinfo-data-outer-container">
            <GoldBadge badge={gold} length={goldLength}/>
            <SilverBadge badge={silver} length={silverLength}/>
            <BronzeBadge badge={bronze} length={bronzeLength}/>
            </div>
        </div>
  )
}

export default UserBadgeInfo