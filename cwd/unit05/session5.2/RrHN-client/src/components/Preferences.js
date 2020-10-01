import React, {useState, useEffect} from 'react';

export default function Preferences(props) {
        return <div className={`${props.color}`}>
        <div class="PreferencesDialog">
            <header>
                <div class="Logo">
                    <div class="colored">RrHN</div>
                    <div class="title">Settings</div>
                </div>
            </header>
            <label for="listSizeField">
                Show <input type="number" name="itemSize" value={props.itemSize} onChange={(e) => props.onItemSizeChange(e.target.value)}
                id="listSizeField" /> items in the list.
            </label>
            <label for="colorField">
                color:
                 <select id="colorField" name="color" value={props.color} onChange={(e) => props.onColorChange(e.target.value)}>
                    <option value="orange">orange</option>
                    <option value="green">green</option>
                    <option value="brown">brown</option>
                </select>
            </label>
            <div class="dialogButtons">
                <button onClick={props.savePreferences}>OK</button>
                <button onClick={() => props.history.goBack()}>Cancel</button>
            </div>
        </div>
    </div>
    // }
}