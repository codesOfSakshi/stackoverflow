import React, { useEffect, useState } from "react";
import "../../styles/navbar.css";
import { ReactComponent as Logo } from "../../images/logo-stackoverflow.svg";
import { Link } from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';
import { useNavigate } from "react-router-dom";

function Navbar() {
  /* --------------------------- declaring variables -------------------------- */

  const navigate = useNavigate();
  const [reputation, setReputation] = useState(20);
  const [profilePic, setProfilePic] = useState(
    "https://www.gravatar.com/avatar/5e6cae8cb4e3834d1d88289e72a75300?s=48&d=identicon&r=PG&f=1"
  );
  const [bronzeTags, setBronzeTags] = useState(1);
  const [silverTags, setSilverTags] = useState(2);
  const [goldTags, setGoldTags] = useState(3);
  const userID = localStorage.getItem("userID");

  const PROFILELINK = `/user/${userID}`;
  const MESSAGELINK = `/messaging`;
  const SEARCHURL = `api/search`;
  const GETUSERDATAURL = `api/user/${userID}`;
  const GETBADGES = `api/tags/badges/${userID}`;
  const [searchString, setsearchString] = useState("");

  /* ------------------------ search related functions ------------------------ */
  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchFunction();
    }
  };

  let searchChangehandler = (e) => {
    e.preventDefault();
    setsearchString(e.target.value);
  };

  /* ---------------------- useEffect to get user details --------------------- */
  useEffect(() => {
    console.log("userDetails ka URL is...", GETUSERDATAURL);
    authapi
      .get(GETUSERDATAURL)
      .then((response) => {
        if (response && response.status == 200) {
          const user = response.data.user;
          setReputation(user.reputation);
          setProfilePic(user.profilePicture);
        }
      })
      .catch();

    authapi
      .get(GETBADGES)
      .then((response) => {
        if (response && response.data) {
          if (response.data.tags) {
            let gbadge = response.data.tags.filter(
              (badge) => badge[1] === "Gold"
            );
            setGoldTags(gbadge.length);
            let sbadge = response.data.tags.filter(
              (badge) => badge[1] === "Silver"
            );
            setSilverTags(sbadge.length);
            let bbadge = response.data.tags.filter(
              (badge) => badge[1] === "Bronze"
            );
            setBronzeTags(bbadge.length);
          }
        }
      })
      .catch((error) =>
        console.log(
          "There was an error while getting the badges and the error is \n",
          error
        )
      );
  }, []);
  /* ----------------------------- search-function ---------------------------- */
  // let searchFunction = async () => {
  //   // console.log(typeof searchString);
  //   console.log(SEARCHURL);
  //   const data = {};
  //   if (searchString.includes("[")) {
  //     let temp = searchString.split("[").pop().split("]");
  //     data.type = "tag";
  //     data.keyword = temp[0];
  //     data.searchString = temp[1];
  //   } else if (searchString.includes("user:")) {
  //     let temp = searchString.split(":").pop();
  //     data.type = "user";
  //     let temp2 = temp.substring(0, temp.indexOf(" "));
  //     if (temp2.length > 0) {
  //       data.keyword = temp.substring(0, temp.indexOf(" "));
  //       data.searchString = temp.substring(temp.indexOf(" ") + 1);
  //     } else {
  //       data.keyword = temp;
  //       data.searchString = "";
  //     }
  //   } else if (searchString.includes('"')) {
  //     let temp = searchString.split('"');
  //     data.type = "exact phrase";
  //     // data.keyword = temp[1];
  //     data.keyword = "";
  //     data.searchString = temp[1];
  //   } else if (searchString.toLowerCase().includes("is:question")) {
  //     let temp = searchString.split(":").pop();
  //     data.type = "question";
  //     let temp2 = temp.substring(0, temp.indexOf(" "));
  //     if (temp2.length > 0) {
  //       data.keyword = "";
  //       data.searchString = temp.substring(temp.indexOf(" ") + 1);
  //     } else {
  //       data.keyword = "";
  //       data.searchString = "";
  //     }
  //   } else if (searchString.includes("is:answer")) {
  //     let temp = searchString.split(":").pop();
  //     data.type = "answer";
  //     let temp2 = temp.substring(0, temp.indexOf(" "));
  //     if (temp2.length > 0) {
  //       data.keyword = "";
  //       data.searchString = temp.substring(temp.indexOf(" ") + 1);
  //     } else {
  //       data.keyword = "";
  //       data.searchString = "";
  //     }
  //   } else if (searchString.includes("isaccepted:")) {
  //     let temp = searchString.split(":").pop();
  //     data.type = "isaccepted";
  //     let temp2 = temp.substring(0, temp.indexOf(" "));
  //     if (temp2.length > 0) {
  //       data.keyword = temp.substring(0, temp.indexOf(" "));
  //       data.searchString = temp.substring(temp.indexOf(" ") + 1);
  //     } else {
  //       data.keyword = temp;
  //       data.searchString = "";
  //     }
  //   } else {
  //     data.searchString = searchString;
  //   }
  //   console.log("the final data is", data);
  //   axios
  //     .post(SEARCHURL, data)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const temp_items = response.data;
  //         console.log(
  //           "the items recieved from sending the api are are.......",
  //           temp_items
  //         );
  //         navigate("/question", {
  //           replace: true,
  //           state: {
  //             searchResult: true,
  //             questions: temp_items.questions,
  //             count: temp_items.count,
  //           },
  //         });
  //       } else if (response.data.code === 500) {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(
  //         "error in getting all items in the search input field in navbar and the error is",
  //         err
  //       );
  //     });
  // };

  /* ----------------------------- search-function ---------------------------- */
  //[Tag1] [Tag2] "Exact phrase2" user:31221321 isaccepted:yes is:question "Exact phrase1"
  let searchFunction = async () => {
    const searchStringSplit = getSearchStrings();
    const parsedData = {};
    parsedData.tags = [];
    parsedData.phrases = [];
    searchStringSplit.forEach((eachString)=>{
        console.log(eachString);
        if(eachString.startsWith("[") && eachString.endsWith("]")){
          parsedData.tags.push(eachString.split("[").pop().split("]")[0]);
        } else if(eachString.startsWith("is:question")){
          parsedData.question = true;
        } else if(eachString.startsWith("user:")){
          const userArray = eachString.split(":");
          console.log(userArray);
          if(userArray && userArray.length){
            parsedData.user = userArray[1];
          }
        } else if(eachString.startsWith("isaccepted:")){
           const acceptedArray = eachString.split(":");
           if(acceptedArray && acceptedArray.length){
             let accepted = acceptedArray[1];
             accepted = accepted.toLowerCase();
             parsedData.accepted = accepted==="yes" ? true : false;
           }
        } else if(eachString.startsWith("\"") && eachString.endsWith("\"")){
          parsedData.phrases.push(eachString.split("\"")[1]);
        } else{
          parsedData.phrases.push(eachString);
        }
    })
    if(!parsedData.question){
      parsedData.question = false;
    }
    console.log("the final data is", parsedData);
    authapi
      .post(SEARCHURL, parsedData)
      .then((response) => {
        if (response.status === 200) {
          const temp_items = response.data;
          console.log(
            "the items recieved from sending the api are are.......",
            temp_items
          );
          navigate("/question", {
            replace: true,
            state: {
              searchResult: true,
              questions: temp_items.questions,
              count: temp_items.count,
            },
          });
        } else if (response.data.code === 500) {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(
          "error in getting all items in the search input field in navbar and the error is",
          err
        );
      });
  };

  let getSearchStrings = ()=>{
    const parsedStrings = [];
    let i = 0;
    for(i=0;i<searchString.length;i++){
      let word = "";
      if(searchString[i]==="["){
         while(i<searchString.length && searchString[i]!=="]"){
           word+=searchString[i++];
         }
         word+=searchString[i++];
         parsedStrings.push(word);
      }
      else if(searchString[i]==="\""){
         while(i+1<searchString.length && searchString[i+1]!=="\""){
           word+=searchString[i++];
         }
         word+=searchString[i++];
         word+=searchString[i++];
         parsedStrings.push(word);
      }
      else if(searchString.substring(i,i+5)==="user:"){
         while(i<searchString.length && searchString[i]!==" "){
           word+=searchString[i++];
         }
         parsedStrings.push(word);
      }
      else if(searchString.substring(i,i+14)==="isaccepted:"){
         while(i<searchString.length && searchString[i]!==" "){
           word+=searchString[i++];
         }
         parsedStrings.push(word);
      }
      else if(searchString.substring(i,i+14)==="is:question"){
         while(i<searchString.length && searchString[i]!==" "){
           word+=searchString[i++];
         }
         parsedStrings.push(word);
      }else{
        while(i<searchString.length && searchString[i]!==" "){
           word+=searchString[i++];
        }
        parsedStrings.push(word);
      }
    }
    return parsedStrings;
  }
  /* ----------------------------- logout function ---------------------------- */
  const logout = () => {
    console.log("logging out function...");
    localStorage.clear();
    navigate("/signin", { replace: true });
  };
  /* ----- second half of the navbar depending on if the user is logged in ---- */
  let isLoggedIn = (
    <>
      <ol className="s-topbar--content" role="presentation">
        <li>
          <Link
            to={PROFILELINK}
            className="s-topbar--item s-user-card s-user-card__small m0 px12"
          >
            <div className="s-avatar s-avatar__24 s-user-card--avatar sm:m0">
              <img
                src={profilePic}
                alt="user avatar"
                width={24}
                height={24}
                className="bar-sm s-avatar--image js-avatar-me"
              />
            </div>{" "}
            <div className="s-user-card--info sm:d-none">
              <ul className="s-user-card--awards">
                <li
                  className="s-user-card--rep js-header-rep"
                  title="your reputation: 13"
                  aria-hidden="true"
                >
                  {reputation}
                  <span className="v-visible-sr">, 13 reputation</span>
                </li>
                <li>
                  <span className="s-award-bling s-award-bling__gold">
                    {goldTags}
                  </span>
                </li>
                <li>
                  <span className="s-award-bling s-award-bling__silver">
                    {silverTags}
                  </span>
                </li>
                <li>
                  <span className="s-award-bling s-award-bling__bronze">
                    {bronzeTags}
                  </span>
                </li>
              </ul>
            </div>
          </Link>
        </li>
        <li>
          <div className="s-topbar--item js-inbox-button">
            <Link to={MESSAGELINK}>
              <svg
                aria-hidden="true"
                className="svg-icon iconInbox"
                width={20}
                height={18}
                viewBox="0 0 20 18"
              >
                <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z" />
              </svg>
              <span className="s-activity-indicator s-activity-indicator__danger js-unread-count d-none">
                0
              </span>
            </Link>
          </div>
        </li>
        <li></li>
      </ol>
      <button onClick={logout} className="s-btn s-btn__primary s-btn__xs">
        logout
      </button>
    </>
  );
  let isLoggedOut = (
    <>
      <Link to="/signin">
        <button className="s-btn s-btn__primary s-btn__xs">Sign In!</button>
      </Link>
    </>
  );
  let secondHalf = userID ? isLoggedIn : isLoggedOut;
  /* ------------------------------ returning jsx ----------------------------- */
  return (
    <header className="s-topbar ps-fixed t0 l0 js-top-bar">
      <div className="s-topbar--container">
        <Link to="/">
          <span className="glyph">
            <Logo />
          </span>
        </Link>
        <form className="s-topbar--searchbar js-searchbar ">
          <div className="s-topbar--searchbar--input-group">
            <input
              type="text"
              placeholder="Search…"
              maxLength={240}
              value={searchString}
              style={{ maxWidth: "55rem", marginTop: "auto" }}
              onChange={(e) => searchChangehandler(e)}
              onKeyDown={handleKeyPress}
              className="s-input s-input__search js-search-field "
            />
            <svg
              aria-hidden="true"
              className="s-input-icon s-input-icon__search svg-icon iconSearch"
              width={18}
              height={18}
              viewBox="0 0 18 18"
            >
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
            </svg>
          </div>
        </form>
        {secondHalf}
      </div>
    </header>
  );
}

export default Navbar;
