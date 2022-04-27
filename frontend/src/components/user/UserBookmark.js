import React from 'react'
import Stack from '@mui/material/Stack';

function UserBookmark() {
    return (
        <div className="ba bc-black-100">
            <div className="s-post-summary--stats">
                <Stack direction="row" spacing={2}>
                <div className="s-post-summary--stats-item has-answers">
                    1 answer
                </div>
                <div className="s-post-summary--stats-item">
                    0 votes
                </div>
                <div className="s-post-summary--stats-item">
                    222 views
                </div>
                <div className="s-post-summary--stats-item">
                    1 bookmarks
                </div>
                </Stack>
            </div>
            <div className="s-post-summary--content">
                <span>
                    <a href="/questions/63110429/jaspersoft-template-type-change-from-xml-to-html"
                       className="s-post-summary--content-title s-link">JasperSoft Template Type change from xml to html</a>
                </span>

                <div className="s-popover px0 py4 w-auto" id="post-menu-63110429" role="menu">



                            <div id="--stacks-s-tooltip-ou1ilnoq" className="s-popover s-popover__tooltip pe-none"
                                 aria-hidden="true" role="tooltip">You have bookmarked this question (click to undo).
                                <div className="s-popover--arrow"></div>
                            </div>

                </div>
                <div className="s-post-summary--meta">
                    <a className="flex--item s-tag" href="#">jquery</a>

                    <div className="s-user-card s-user-card__minimal">
                        <time className="s-user-card--time">
                            <span title="2020-07-27 07:18:02Z" className="relativetime">Jul 27, 2020 at 7:18</span>
                        </time>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBookmark;