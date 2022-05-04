import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";
import "./AddTag.css";

const AddTag = () => {
  const [tags, setTags] = useState();
  // const [newTag, setNewTag] = useState({name: "", description: ""});

  const [tagName, setTagName] = useState();
  const [tagDesc, setTagDesc] = useState();
  const [tagExists, setTagExists] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    let newTag = {
      tagId: tagName,
      name: tagName,
      description: tagDesc,
    };

    axiosApi
      .post(constants.API.baseURL + constants.API.TAG.addTag, newTag)
      .then(
        (res) => {
          // console.log(res);
          if (res && res.data && res.data.status === true) {
            setTags([...tags, tagName]);
            console.log(tags);
            setTagExists(false);
          } else {
            console.log(res.data);
            setTagExists(true);
            console.log(tagExists);
          }
        },
        (err) => {
          console.log(err);
          setTagExists(true);
          console.log(tagExists);
        }
      );
  };

  const handleNameInput = (e) => {
    // console.log(e.target.value);
    setTagName(e.target.value);
  };

  const handleDescInput = (e) => {
    // console.log(e.target.value);
    setTagDesc(e.target.value);
  };

  const getTags = () => {
    axiosApi.get(constants.API.TAG.getTags).then(
      (res) => {
        // console.log(res);
        if(res && res.data){
          let tagNames = res.data.map(x=>x.name);
          // console.log(tagNames);
          setTags([...tagNames]);
          // console.log(tags);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(getTags, []);

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
          
          {tagExists && <aside class="s-notice s-notice__danger" role="status">Tag already exists.</aside>}
        </form>
        <ul id="tagList">{tags && tags.map((tag) => displayTag(tag))}</ul>
      </div>
    </div>
  );
};

const displayTag = (tag) => <li class="s-tag">{tag}</li>;

export default AddTag;
