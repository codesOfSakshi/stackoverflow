
import * as React from 'react';
import Stack from '@mui/material/Stack';


const UserTopPost = ({post}) => {

    return (
    <div>
<div class="p12 bb bc-black-075">
    <div class="d-flex gs12 gsx ai-center">
        <div class="flex--item fc-black-300 fl-shrink0">
    <svg class="svg-icon iconQuestion" width="18" height="18" viewBox="0 0 18 18"><title>question</title><path d="m4 15-3 3V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v9c0 1.09-.91 2-2 2H4Zm7.75-3.97c.72-.83.98-1.86.98-2.94 0-1.65-.7-3.22-2.3-3.83a4.41 4.41 0 0 0-3.02 0 3.8 3.8 0 0 0-2.32 3.83c0 1.29.35 2.29 1.03 3a3.8 3.8 0 0 0 2.85 1.07c.62 0 1.2-.11 1.71-.34.65.44 1 .68 1.06.7.23.13.46.23.7.3l.59-1.13a5.2 5.2 0 0 1-1.28-.66Zm-1.27-.9a5.4 5.4 0 0 0-1.5-.8l-.45.9c.33.12.66.29.98.5-.2.07-.42.11-.65.11-.61 0-1.12-.23-1.52-.68-.86-1-.86-3.12 0-4.11.8-.9 2.35-.9 3.15 0 .9 1.01.86 3.03-.01 4.08Z"></path></svg>                            </div>
        <div class="flex--item s-badge s-badge__votes" style="min-width: 38px;">{post.upvotes}</div>
        <div class="flex--item fl-grow1 pr12 js-gps-track" data-gps-track="profile_link.click({ target: 3, type: 1 })">
            <a href="{post.link}" class="question-hyperlink d-table tl-fixed w100 m0 ow-break-word">{post.title}</a>
        </div>
        <div class="flex--item ml-auto fc-light ws-nowrap"><span title="{post.createdat}" class="relativetime">{post.createdat}</span></div>
    </div>
</div>
    </div>
    );
}

export default UserTopPost;
