import React from 'react';

export default function IFrameArea(props) {
    if(props.frameTarget == '') {
        return IFrameAreaEmpty()
    } else {
        return IFrameAreaFilled(props.frameTarget)
    }
}

function IFrameAreaEmpty(props = '') {
    return <div id="ItemPanel">
        <h2>No item selected yet.</h2>

        <p>Select an item in the colum on the left.</p>
    </div>
}

function IFrameAreaFilled(props) {
    return <div id="ItemPanel">
        <iframe class="IFrameView" src={props.url} frameborder="0" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"></iframe>
    </div>
}