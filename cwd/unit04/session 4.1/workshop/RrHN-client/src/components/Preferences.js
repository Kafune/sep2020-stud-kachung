import React from 'react';

export default function Preferences(props) {
    const checkInput = (e) => {
        // e.preventDefault;
        props.preferenceHandler(props.preferenceHandler);
        console.log(props.preferenceHandler)
    }

    return <div id="ItemPanel" class="preferences">
    <div class="PreferencesDialog">
        <header>
            <div class="Logo">
                <div class="colored">RrHN</div>
                <div class="title">Settings</div>
            </div>
        </header>
        <label for="listSizeField">
            Show <input type="number" name="itemSize" id="listSizeField" value={props.options.itemSize} onChange={checkInput}/> items in the list.
        </label>
        <label for="colorField">
            color:
             <select id="colorField" name="color" onChange={checkInput} value={props.options.color}>
                <option value="orange">orange</option>
                <option value="green">green</option>
                <option value="brown">brown</option>
            </select>
        </label>
        <div class="dialogButtons"><button>OK</button><button>Cancel</button></div>
    </div>
</div>
}
