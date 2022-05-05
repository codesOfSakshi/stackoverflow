import React from "react";

function UsersSearchBar({ searchString, searchChangehandler, handleKeyPress }) {
  //   console.log("------", searchString, searchChangehandler, handleKeyPress);
  return (
    <>
      <div className="s-topbar--searchbar--input-group">
        <input
          style={{ width: "15rem", float: "left" }}
          type="text"
          placeholder="Search…"
          maxLength={240}
          value={searchString}
          onChange={(e) => searchChangehandler(e)}
          onKeyDown={handleKeyPress}
          className="s-input s-input__search js-search-field "
        />
      </div>
    </>
  );
}

export default UsersSearchBar;
