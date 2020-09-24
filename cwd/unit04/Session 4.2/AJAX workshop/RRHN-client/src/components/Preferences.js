import React from 'react';


export default class Preferences extends React.Component {

    state = {
        ...this.props.preferences,
    };

    handleColorChange = (e) => {
        this.setState({color: e.target.value});
    }

    handleItemSize = (e) => {
        if(isNaN(this.state.itemSize) || this.state.itemSize < 0) {
            this.setState({itemSize: null});
        }
        this.setState({itemSize: e.target.value});
    }
    
    // saveThePrefs = () => {
    //     this.props.savePrefs({color: this.state.color, itemSize: this.state.itemSize});
    // }


    render() {
        let checkInputSize = (input) => {
            return input < 0 || input > 500 ? 'inputBorder' : '';
        }

        return <div id="ItemPanel" className={`${this.state.color}`}>
        <div class="PreferencesDialog">
            <header>
                <div class="Logo">
                    <div class="colored">RrHN</div>
                    <div class="title">Settings</div>
                </div>
            </header>
            <label for="listSizeField">
                Show <input type="number" name="itemSize" onChange={this.handleItemSize} className={checkInputSize(this.state.itemSize)} 
                id="listSizeField" value={this.state.itemSize}/> items in the list.
            </label>
            <label for="colorField">
                color:
                 <select id="colorField" name="color" onChange={this.handleColorChange}>
                    <option value="orange">orange</option>
                    <option value="green">green</option>
                    <option value="brown">brown</option>
                </select>
            </label>
            <div class="dialogButtons" onClick={() => {this.savePrefs}}><button>OK</button><button>Cancel</button></div>
        </div>
    </div>
    }
}