import React, { useState } from "react";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";
import "./AddTag.css";

const AddTag = () => {
  const [tags, setTags] = useState(["bug", "css", "design"]);
  // const [newTag, setNewTag] = useState({name: "", description: ""});

  const [tagName, setTagName] = useState();
  const [tagDesc, setTagDesc] = useState();
  const handleInput = (e) => {
    e.preventDefault();
    let newTag = {
      name: tagName,
      description: tagDesc,
    };

    axiosApi
      .post(constants.API.baseURL + constants.API.TAG.addTag, newTag)
      .then(
        (res) => {
          // console.log(res);
          if (res && res.data && res.data.success === true) {
            setTags([...tags, tagName]);
            console.log(tags);
          }else{
            console.log(res.data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const handleNameInput = (e) => {
    console.log(e.target.value);
    setTagName(e.target.value);
  };

  const handleDescInput = (e) => {
    console.log(e.target.value);
    setTagDesc(e.target.value);
  };

  return (
    <div>
      <div class="_box">
        <form>
          <label class="d-block s-label" for="tagList">
            Add tag (Press ENTER to Add new Tag)
          </label>
          <input
            onChange={(e) => {
              handleNameInput(e);
            }}
            class="s-input"
            type="text"
            id="newTagName"
          />
          <input
            onChange={(e) => {
              handleDescInput(e);
            }}
            class="s-input"
            type="text"
            id="newTagDesc"
          />
          <button
            onClick={(e) => {
              handleInput(e);
            }}
            class="s-btn s-btn__primary"
            type="submit"
            aria-pressed="false"
            title="…"
          >
            Add tag
          </button>
        </form>
        <ul id="tagList">{tags && tags.map((tag) => displayTag(tag))}</ul>
      </div>
    </div>
  );
};

const displayTag = (tag) => <li class="s-tag">{tag}</li>;

export default AddTag;
