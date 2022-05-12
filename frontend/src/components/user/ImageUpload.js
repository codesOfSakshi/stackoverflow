
import React, {useEffect, useState} from "react";
import {axiosInstance as authapi} from '../../services/authaxiosservice';
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

    const imageUrl = cookies.get('imageUrl').split('?')[0]
    console.log(imageUrl)
    cookies.set('imageUrl', imageUrl, { path: '/' });
    console.log(cookies.get('imageUrl'))
};

export default function ImageUpload(){
    const [url, setUrl] = useState("");


    const getUser = async () => {
        try{
            const response = await authapi.get("/api/s3/updateImage");
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
                   data-action="input->s-uploader#handleInput"
                   onChange={handleUploadClick}/>
            <div class="s-uploader--previews d-none"
                 data-target="s-uploader.previews"
                 data-s-uploader-show-on-input>
            </div>
            <button class="s-uploader--reset s-btn s-btn__muted d-none" data-action="click->s-uploader#reset"
                    data-s-uploader-show-on-input >
                @Svg.ClearSm
            </button>

        </div>
    </div>
    Upload a profile picture
    </div>
}
