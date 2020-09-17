import React from 'react';

export default function IFrameArea(props) {
    return <div id="ItemPanel">
    <iframe class="IFrameView" src={props.frameTarget.url} frameborder="0" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"></iframe>
 </div>             
}