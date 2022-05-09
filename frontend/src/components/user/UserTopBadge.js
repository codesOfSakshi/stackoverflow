import React, {useEffect, useState} from "react";
import UserBadge from "./UserBadge";

export default function UserTopBadge({badge}) {

    return (
        <div className="badge-container">
            {badge.map(badges=>{
                return <div>
                    <div className="badge-title">
                        {badges[1] === "Gold" &&
                            <div className="badge-gold-type"></div>}
                        {badges[1] === "Silver" &&
                            <div className="badge-silver-type"></div>}
                        {badges[1] === "Bronze" &&
                            <div className="badge-bronze-type"></div>}
                        <div className="badge-name">{badge[0]}</div>
                    </div>
                </div>
            })}
        </div>
    )
}