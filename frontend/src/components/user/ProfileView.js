import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CakeIcon from '@mui/icons-material/Cake';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import axiosService from "../../services/axiosservice";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

export default function ProfileView() {
    const GET_USER_API = "api/user/";
    const search = useLocation().search;
    const {userId} = new useParams(search);
    const [user,setUser] = useState("");
    const theme = useTheme();
    const getUser = async () => {
        try{
            const response = await axiosService.get(GET_USER_API+userId);
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
                        Member for 5 years,9 months
                    </Typography>
                 </Stack>
                <Stack direction="row">
                    <WatchLaterIcon/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Last seen this week
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <CalendarMonthIcon/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Visited 230 days,8 consecutive
                    </Typography>
                </Stack>
            </Stack>
                </CardContent>
                </div>

            </Box>
            </Box>
        </div>
            <div className="flex--item">

            <a className="flex--item s-btn s-btn__outlined s-btn__muted s-btn__icon s-btn__sm"
               href={"/user/edit/"+userId}>
                <svg aria-hidden="true" className="svg-icon iconPencil" width="18" height="18" viewBox="0 0 18 18">
                </svg>
                Edit profile</a>
            </div>

        </div>


    );
}
