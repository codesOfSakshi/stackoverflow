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

export default function ProfileView() {
    const theme = useTheme();

    return  (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="./images/user.png"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Sakshi
                    </Typography>
                </CardContent>



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


            </Box>
          <Stack sx={{  }}>
            <Button variant="outlined" size="small" >
                <EditIcon/>
                <div> Edit </div>
               </Button>
          </Stack>
        </Card>
    );
}
