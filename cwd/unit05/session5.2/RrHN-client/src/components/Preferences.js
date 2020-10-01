import React from 'react';


export default class Preferences extends React.Component {
    handleColorChange = (e) => {
        // this.setState({color: e.target.value});
        this.props.onColorChange(e.target.value)
    }

    handleItemSize = (e) => {
        const regex = /^[0-9\b]+$/;

        //check of de invoer geldig is. zo niet, geef de input deze waarde.
        if(!regex.test(e.target.value) || e.target.value < 0) {
            e.target.value = 1;
        }
        
        this.props.onItemSizeChange(e.target.value);
    }
    
    savePreferences = () => {
        this.props.applyPreferences({
            itemSize: this.props.itemSize,
            color: this.props.color
        });
        this.props.history.goBack();
    }


    render() {
        let checkInputSize = (input) => {
            return input < 0 || input > 500 ? 'inputBorder' : '';
        }

        return <div id="ItemPanel" className={`${this.props.color}`}>
        <div class="PreferencesDialog">
            <header>
                <div class="Logo">
                    <div class="colored">RrHN</div>
                    <div class="title">Settings</div>
                </div>
            </header>
            <label for="listSizeField">
                Show <input type="number" name="itemSize" value={this.props.itemSize} onChange={this.handleItemSize} className={checkInputSize(this.props.itemSize)} 
                id="listSizeField" /> items in the list.
            </label>
            <label for="colorField">
                color:
                 <select id="colorField" name="color" value={this.props.color} onChange={this.handleColorChange}>
                    <option value="orange">orange</option>
                    <option value="green">green</option>
                    <option value="brown">brown</option>
                </select>
            </label>
            <div class="dialogButtons">
                <button onClick={this.savePreferences}>OK</button>
                <button onClick={() => this.props.history.goBack()}>Cancel</button>
            </div>
        </div>
    </div>
    }
}