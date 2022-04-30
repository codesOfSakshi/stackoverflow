import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageUploadCard from '../components/user/ImageUpload';


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

    ;

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setUrl("")

        const req1= {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                shop_image_url: "",
                shop_id:seller.shop_id
            })
        }
        fetch("http://localhost:5000/shop/updateImage",req1)
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
                        src="https://www.gravatar.com/avatar/90e6eb5665442d70692337c9cab713ea?s=328&amp;d=identicon&amp;r=PG&amp;f=1"
                        alt="user avatar" width="164" height="164" className="bar-sm main-image"/></div>
                    <button className="s-btn__sm s-btn__primary" type="button" onClick={handleClickOpen}>Change picture</button>

                </div>
                <br/>
                <br/>
                <h4>Display Name</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value="Sam" data-default="Sakshi Mishra" maxLength="30" tabIndex="1" data-site="Sam"/>
                </div>
                <h4>Location</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value="Sam" data-default="Sakshi Mishra" maxLength="30" tabIndex="1" data-site="Sam"/>
                </div>
                <h4>Title</h4>
                <div className="d-flex ps-relative">
                    <input className="s-input wmx4 sm:wmx-initial" id="displayName" name="DisplayName" type="text"
                           value="Sam" data-default="Sakshi Mishra" maxLength="30" tabIndex="1" data-site="Sam"/>
                </div>
                <br/>
                <button className="s-btn s-btn__primary" type="button">Save Changes</button>
            </div>


        </Card>
    );
}
