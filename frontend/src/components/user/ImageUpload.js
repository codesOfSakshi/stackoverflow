// imports the React Javascript Library
import React, {useEffect, useState} from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Icon from "@material-ui/core/Icon";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CollectionsIcon from "@material-ui/icons/Collections";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import { withStyles } from "@material-ui/core/styles";
import axiosService from "../../services/axiosservice";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const handleUploadClick = async event => {
    console.log("changed")
    var file = event.target.files[0];
    await fetch(cookies.get('imageUrl'), {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = this.state.uploadUrl.split('?')[0]
    console.log(imageUrl)
    cookies.set('imageUrl', imageUrl, { path: '/' });
};

export default function ImageUpload(){
    const [url, setUrl] = useState("");


    const getUser = async () => {
        try{
            const response = await axiosService.get("/api/s3/updateImage");
            if(response && response.data){
                console.log(response.data.data)
                setUrl(response.data)
                const imageUrl = response.data.data.split('?')[0]
                cookies.set('imageUrl', response.data.data , { path: '/' });
            }
        }catch(e){
            console.log(e);

        }
    }
    useEffect(() => {
        getUser();
    },[]);

    return <div>
    <label class="d-block s-label mb4" for="uploader">Upload a profile picture</label>
    <div data-controller="s-uploader">
        <div class="s-uploader mb24 wmx3" data-target="s-uploader.uploader">
            <input id="uploader"
                   type="file"
                   class="s-uploader--input"
                   data-s-uploader-target="input"
                   data-action="input->s-uploader#handleInput" />
            <div class="s-uploader--previews d-none"
                 data-target="s-uploader.previews"
                 data-s-uploader-show-on-input>
            </div>
            <button class="s-uploader--reset s-btn s-btn__muted d-none" data-action="click->s-uploader#reset"
                    data-s-uploader-show-on-input >
                @Svg.ClearSm
            </button>
            <div data-s-uploader-hide-on-input onChange={(e) => handleUploadClick(e.target.value)}>
                @Svg.Spot.Image.With("fc-medium mb8")
                <div class="fs-body2">Drag an image to upload</div>
                <div class="fs-caption">
                    Or <span class="s-link">choose your image</span>
                </div>
            </div>
        </div>
        <div>
            <button class="s-btn s-btn__primary" data-s-uploader-enable-on-input disabled >
                Upload
            </button>
            <button class="s-btn d-none"
                    data-action="click->s-uploader#reset"
                    data-s-uploader-show-on-input>
                Cancel
            </button>
        </div>
    </div>
    Upload a profile picture
    </div>
}
