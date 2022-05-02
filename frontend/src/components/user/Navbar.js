import React from "react";
import "../../styles/navbar.css";
import { ReactComponent as Logo } from "../../images/logo-stackoverflow.svg";
import { Link } from "react-router-dom";

function Navbar() {
  /* --------------------------- declaring variables -------------------------- */
  let reputation = 15;
  let bronzeTags = 1;
  let silverTags = 2;
  let goldTags = 3;
  let profilePic =
    "https://www.gravatar.com/avatar/5e6cae8cb4e3834d1d88289e72a75300?s=48&d=identicon&r=PG&f=1";
  let profileLink = "www.stackoverflow.com";
  /* ------------------------------ returning jsx ----------------------------- */
  return (
    <header className="s-topbar ps-fixed t0 l0 js-top-bar">
      <div className="s-topbar--container">
        {/* TODO Add link to homepage */}
        <Link to="/">
          <span className="glyph">
            <Logo />
          </span>
        </Link>
        <form
          id="search"
          role="search"
          action="/search"
          className="s-topbar--searchbar js-searchbar "
          autoComplete="off"
        >
          <div className="s-topbar--searchbar--input-group">
            <input
              name="q"
              type="text"
              placeholder="Search…"
              defaultValue
              autoComplete="off"
              maxLength={240}
              className="s-input s-input__search js-search-field "
              aria-label="Search"
              aria-controls="top-search"
              data-controller="s-popover"
              data-action="focus->s-popover#show"
              data-s-popover-placement="bottom-start"
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
            {/* <div
              className="s-popover p0 wmx100 wmn4 sm:wmn-initial js-top-search-popover"
              id="top-search"
              role="menu"
            >
              <div className="s-popover--arrow" />
              <div className="js-spinner p24 d-flex ai-center jc-center d-none">
                <div className="s-spinner s-spinner__sm fc-orange-400">
                  <div className="v-visible-sr">Loading…</div>
                </div>
              </div>
              <span className="v-visible-sr js-screen-reader-info" />
              <div className="js-ac-results overflow-y-auto hmx3 d-none" />
              <div
                className="js-search-hints"
                aria-describedby="Tips for searching"
              />
            </div> */}
          </div>
        </form>
        <ol className="s-topbar--content" role="presentation">
          <li>
            <a
              href="#"
              className="s-topbar--item s-btn s-btn__icon s-btn__muted d-none sm:d-inline-flex js-searchbar-trigger"
              role="button"
              aria-label="Search"
              aria-haspopup="true"
              aria-controls="search"
              title="Click to show search"
            >
              <svg
                aria-hidden="true"
                className="svg-icon iconSearch"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              >
                <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="/users/8197430/scarlet-dragon"
              className="s-topbar--item s-user-card s-user-card__small m0 px12 js-gps-track"
            >
              <div
                className="s-avatar s-avatar__24 s-user-card--avatar sm:m0"
                title="scarlet_dragon"
              >
                <img
                  src={profilePic}
                  alt="user avatar"
                  width={24}
                  height={24}
                  className="bar-sm s-avatar--image js-avatar-me"
                />
              </div>{" "}
              <span className="v-visible-sr">scarlet_dragon</span>
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
                      {bronzeTags}
                    </span>
                  </li>
                  <li>
                    <span className="s-award-bling s-award-bling__silver">
                      {silverTags}
                    </span>
                  </li>
                  <li>
                    <span className="s-award-bling s-award-bling__bronze">
                      {goldTags}
                    </span>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li>
            <div className="s-topbar--item js-inbox-button">
              {/* TODO add the correct link */}
              <Link to=".dummy">
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
        </ol>
      </div>
    </header>
  );
}

export default Navbar;
