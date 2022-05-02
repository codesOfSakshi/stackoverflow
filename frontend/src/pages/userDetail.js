import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageUploadCard from '../components/user/ImageUpload';
import Cookies from 'universal-cookie';

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

export default function ReviewCard({seller}) {



    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState([]);
    const cookies = new Cookies();

    fetch("http://localhost:5000/api/user/"+user.userId)
        .then(response => {
            if(response.status===200)
            {   console.log("Fetch user successfully")
                console.log(response.body)
                setUser(response.body)

            }
            else{
                console.log("Fetch user Failed")
            }

        })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setUrl("")

        const req= {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                shop_image_url: cookies.get('image_url'),
                user_id:user.user_id,

            })
        }
        fetch("http://localhost:5000/api/s3/updateImage",req)
            .then(response => {
                if(response.status===200)
                {   console.log("Image is updated successfully")
                    console.log(response.body)

                }
                else{
                    console.log("Image update Failed")
                }

            })
    };

    const updateUser = () => {
        setUrl("")

        const req= {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                location: location,
                title:title

            })
        }
        fetch("http://localhost:5000/api/user/edit-partial"+user.user_id,req)
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
                        src={user.profilePic}
                        alt={user.name} width="164" height="164" className="bar-sm main-image"

                    /></div>
                    <button className="s-btn__sm s-btn__primary" type="button" onClick={handleClickOpen}>Change picture</button>

                </div>
                <br/>
                <br/>
                <h4>Display Name</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={user.name} maxLength="30" onChange={(e) => setName(e.target.value)}/>
                </div>
                <h4>Location</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={user.location} maxLength="30" onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <h4>Title</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value={user.title}  maxLength="30" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <br/>
                <button className="s-btn s-btn__primary" type="button" onClick={ updateUser}>Save Changes</button>
            </div>


        </Card>
    );
}
