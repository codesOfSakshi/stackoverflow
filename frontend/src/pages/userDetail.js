import React, { useState,  useEffect } from "react";
import Cookies from 'universal-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageUploadCard from '../components/user/ImageUpload';
import CardMedia from "@mui/material/CardMedia";


import {
    Grid,
    Paper,
    Typography,
    IconButton,
    createMuiTheme,
    MuiThemeProvider,
    makeStyles,
    TextField,
    Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
const cookies = new Cookies();
let theme = createMuiTheme();
theme.typography.h6 = {
    fontSize: "1rem",
    "@media (min-width:900px)": {
        fontSize: "1.05rem"
    },
    "@media (min-width:1000px)": {
        fontSize: "1.1rem"
    },
    "@media (min-width:1200px)": {
        fontSize: "1.2rem"
    },
    "@media (min-width:1300px)": {
        fontSize: "1.25rem"
    }
};

// dummy data
const user = {
    name: "name",
    location: "location",
    title: "title"
    //   imagelink: "This is my image",
};

const mapInformation = {
    name: "Name",
    location: "location",
    title: "title"
};

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "orange",
        color: "white",
        padding: "1em",
        width: "60%",
        [theme.breakpoints.down(1200)]: {
            width: "70%"
        },
        [theme.breakpoints.down(1000)]: {
            width: "80%"
        },
        [theme.breakpoints.down(900)]: {
            width: "90%"
        },
        [theme.breakpoints.down(800)]: {
            width: "100%"
        }
    },
    form: {
        backgroundColor: "white",
        color: "orange ",
        padding: "1em",
        width: "60%",
        [theme.breakpoints.down(1200)]: {
            width: "70%"
        },
        [theme.breakpoints.down(1000)]: {
            width: "80%"
        },
        [theme.breakpoints.down(900)]: {
            width: "90%"
        },
        [theme.breakpoints.down(800)]: {
            width: "100%"
        }
    }
}));

const UserInfoFormItem = (formState, onChange, propt, index) => {

























    const classes = useStyles();
    return (
        <Grid
            item
            xs={6}
            key={`display-${index}`}
            container
            direction="column"
            alignItems="center"
        >
            <Paper className={classes.form}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        defaultValue={formState[propt]}
                        name={Object.keys(user)[index]}
                        onChange={onChange}
                    />
                </Grid>
            </Paper>
        </Grid>
    );
};

const UserInfoGridItem = (formState, propt, index) => {
    const classes = useStyles();
    return (
        <Grid
            item
            xs={6}
            key={`display-${index}`}
            container
            direction="column"
            alignItems="center"
        >
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6">{formState[propt]}</Typography>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default function Profile() {
    const [isForm, setIsForm] = useState(false);
    const [formInput, setFormInput] = useState([]);
    const [url, setUrl] = useState(cookies.get('imageUrl'));

    const [open, setOpen] = React.useState(false);
    let userId =  cookies.get('userId')
    // ADD AJAX CALLS HERE IN A USE EFFECT HOOK, use api call to update formInput as the user info, once it works replace the initial state of form info with a blank string




    const handleEdit = () => setIsForm(true);

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

    const handleChange = (e) => {
        const value = e.target.value;
        setFormInput((prev) => ({
            ...prev,
            [e.target.name]: value
        }));
    };

    const handleSubmit = () => {
        setFormInput(formInput);

        console.log("Product")


        const toggleRender = () => {
            if (isForm) {
                return Object.keys(user).map((key, index) =>
                    UserInfoFormItem(formInput, handleChange, key, index)
                );
            }

            return Object.keys(user).map((key, index) =>
                UserInfoGridItem(formInput, key, index)
            );
        };
    }

    const handlePopUp = () => {

    };

    return (
        <div>

            <div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>

                        <ImageUploadCard/>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>


            </div>
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item sm={6} md={4} align="right" onClick ={handleClickOpen}>
                            <Paper
                                style={{ border: "2px solid", height: "200px", width: "200px" }}
                            >
                                <CardMedia
                                    component="img"
                                    height="194"
                                    object-fit ="contain"
                                    image={url}
                                    alt="Profile Pic"
                                />
                            </Paper>
                        </Grid>
                        <Grid item sm={6} md={8} alignt="left" container>
                            <Grid item xs={12} container alignItems="flex-end">
                                <Typography variant="h4">{`${formInput.name}`}</Typography>
                                <IconButton
                                    style={{ backgroundColor: "orange", marginLeft: "1rem" }}
                                    onClick={handleEdit}
                                >
                                    <EditIcon style={{ color: "white" }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </MuiThemeProvider>
        </div>
    );
}
