import React from 'react';

// export default function Preferences(props) {
//     const checkInput = (e) => {
//         // e.preventDefault;
//         props.preferenceHandler(props.preferenceHandler);
//         console.log(props.preferenceHandler)
//     }

//     return <div id="ItemPanel" class="preferences">
//     <div class="PreferencesDialog">
//         <header>
//             <div class="Logo">
//                 <div class="colored">RrHN</div>
//                 <div class="title">Settings</div>
//             </div>
//         </header>
//         <label for="listSizeField">
//             Show <input type="number" name="itemSize" id="listSizeField" value={props.options.itemSize} onChange={checkInput}/> items in the list.
//         </label>
//         <label for="colorField">
//             color:
//              <select id="colorField" name="color" onChange={checkInput} value={props.options.color}>
//                 <option value="orange">orange</option>
//                 <option value="green">green</option>
//                 <option value="brown">brown</option>
//             </select>
//         </label>
//         <div class="dialogButtons"><button>OK</button><button>Cancel</button></div>
//     </div>
// </div>
// }

export default class Preferences extends React.Component {

    state = {
        ... this.props.preferences,
    };

    handleColorChange = (e) => {
        this.setState({color: e.target.value})
    }

    handleItemSize = (e) => {
        this.setState({itemSize: e.target.value});
    }
    
    saveThePrefs = () => this.props.savePrefs({color: this.state.color, itemSize: this.state.itemSize})

    render() {
        console.log(`PreferencesDialog ${this.state.color}`)
        return <div id="ItemPanel" className={`PreferencesDialog ${this.state.color}`}>
        <div class="PreferencesDialog">
            <header>
                <div class="Logo">
                    <div class="colored">RrHN</div>
                    <div class="title">Settings</div>
                </div>
            </header>
            <label for="listSizeField">
                Show <input type="number" name="itemSize" id="listSizeField" value={this.props.options.itemSize} onChange={this.handleItemSize}/> items in the list.
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