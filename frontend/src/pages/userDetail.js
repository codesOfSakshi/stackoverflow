import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageUploadCard from '../components/user/ImageUpload';
import Cookies from 'universal-cookie';
import {useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../services/authaxiosservice';
import Navbar from "../components/user/Navbar";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ReviewCard() {


    const GET_USER_API = "api/user/";
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState([]);
    const [name, setName] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [title, setTitle] = useState(user.title);
    const [url, setUrl] = useState(user.profilePicture);
    const cookies = new Cookies();
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(params)

    const getUser = async () => {

        try{
            const response = await authapi.get(GET_USER_API+userId);
            if(response && response.data && response.data.success && response.data.user){
              console.log(response.data.user)
              setUser(response.data.user)
              setUrl(response.data.user.profilePicture)
              setLocation(response.data.user.location)
              setName(response.data.user.name)
              setTitle(response.data.user.title)
            }
        }catch(e){
            console.log(e);

        }
    }

    useEffect(() => {
        getUser();
    },[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setUrl(cookies.get('imageUrl'))
        console.log(cookies.get('imageUrl'))
    };

    const updateUser = () => {
        const req= {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization':'JWT '+localStorage.getItem('token') },
            body: JSON.stringify({
                name: name,
                location: location,
                title:title,
                profilePicture:cookies.get('imageUrl')
            })
        }
        fetch("http://54.183.240.252:3001/api/user/edit-partial/"+user._id,req)
            .then(response => {
                if(response.status===200)
                {   console.log("User updated successfully")
                    console.log(response.body)
                }
                else{
                    console.log("User update Failed")
                }

            })
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 800, ml:50 }}>
            <Navbar/>
            <Card sx={{ maxWidth: 200, ml:50 }}>
                <Dialog open={open} onClose={handleClose}>

                    <DialogContent>
                        <ImageUploadCard/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Card>


            <h1>Public information</h1>
            <div className="bg-white d:bg-black-025 bar-md ba bc-black-075 mb48 p24 sm:p12">
                <div >
                    <div className="gravatar-wrapper-164"><img
                        src={url}
                        alt={user.name} width="164" height="164" className="bar-sm main-image"

                    /></div>
                    <button className="s-btn__sm s-btn__primary" type="button" onClick={handleClickOpen}>Change picture</button>

                </div>
                <br/>
                <br/>
                <h4>Display Name</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={name} maxLength="30" onChange={(e) => setName(e.target.value)}/>
                </div>
                <h4>Location</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={location} maxLength="30" onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <h4>Title</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={title}  maxLength="30" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <br/>
                <button className="s-btn s-btn__primary" type="button" onClick={ updateUser}>Save Changes</button>
            </div>


        </Card>
    );
}
