import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CakeIcon from '@mui/icons-material/Cake';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';
import jwt_decode from 'jwt-decode';

export default function ProfileView() {
    const GET_USER_API = "api/user/";
    const search = useLocation().search;
    const {userId} = new useParams(search);
    const [user,setUser] = useState("");
    const theme = useTheme();
    const token = localStorage.getItem("token");
    const decoded = token?jwt_decode(token.split('.')[1], { header: true }):null;
    const logincred=decoded? decoded._id:null;
    const getUser = async () => {
        try{
            const response = await authapi.get(GET_USER_API+userId);
            if(response && response.data && response.data.success && response.data.user){
                if(response.data.user){
                    setUser(response.data.user);
                }

            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    },[]);

    return  (
        <div className="d-flex">
        <div className="flex--item fl-grow1">
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <img
                    src={user.profilePicture}
                    alt="user avatar" width="164" height="164" className="bar-sm main-image"/>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <div className="mt48">
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h3">
                        {user.name}
                    </Typography>

            <Stack direction="row" spacing={2}>
                 <Stack direction="row">
                    <CakeIcon/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Member for 1 day
                    </Typography>
                 </Stack>
                <Stack direction="row">
                    <WatchLaterIcon/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Last seen today
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <CalendarMonthIcon/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {user.location}
                    </Typography>
                </Stack>
            </Stack>
                </CardContent>
                </div>

            </Box>
            </Box>
        </div>
            {logincred!=null&& userId == logincred && <div className="flex--item">

            <a className="flex--item s-btn s-btn__outlined s-btn__muted s-btn__icon s-btn__sm"
               href={"/user/edit/"+userId}>
                <svg aria-hidden="true" className="svg-icon iconPencil" width="18" height="18" viewBox="0 0 18 18">
                </svg>
                Edit profile</a>
            </div>}

        </div>


    );
}
