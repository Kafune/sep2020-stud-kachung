import React from 'react'

import frontPageItems from '../frontpageData';

import ItemList from './ItemList';
import IFrameArea from './IFrameArea';



export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);
      this.onSelectItem = this.onSelectItem.bind(this);
      // this.handleItemSize = this.handleItemSize.bind(this);
      this.state = {
         items: frontPageItems,
         selectedValue: '',
         preferenceDialog: true,
         preferences: {
            itemSize: 5,
            color: 'orange'
         },
         itemStatus: null
      }
      // this.setPreference = this.setPreference.bind(this);
   }

   // savePrefs = (preferences) => {
   //    this.setState((state, props) => ({
   //       preferences: {...preferences},
   //       preferenceDialog: false
   //    }));
   // }

   onSelectItem(item) {
      this.setState({
         selectedValue: item
      });
   };

   handleItemSize(itemSizeValue) {
      // if(isNaN(this.state.itemSize) || this.state.itemSize < 0) {
      //     this.setState({itemSize: null});
      // }
      this.setState({itemSize: itemSizeValue});
      // console.log(e.target.value);
  }

  handleColorChange(){
   this.setState({color: this.state.preferences.color});

  }

   // setPreference(e) {
   //    const target = e.target;
   //    const value = target.value;
   //    const name = target.name;
   //    this.setState({
   //       preferences: {
   //          [name]: value
   //       }
   //    });
   // };


   render() {
   const preferences = this.state.preferences;

      return <div className="App">
         <div id="ListPanel">
            <div className="ItemList">
               <header id="ListHeader" class="panelHeader">
                  <div class="Logo">
                     <div class="colored">RrHN</div>
                     <div class="title">React-redux Hacker News</div>
                  </div>
                  <span class="settingsIcon">
                     <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"></path>
                     </svg>
                  </span>
               </header>
               <div id="ListMainContent">
                  <ItemList list={this.state.items} onSelect={this.onSelectItem} itemSize={preferences.itemSize}/>
               </div>
               <div id="ListFooter">
                  visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
            </div>
            </div>
         </div>

         <IFrameArea frameTarget={this.state.selectedValue} showDialog={this.state.preferenceDialog} 
         preferences={preferences} itemSize={preferences.itemSize} color={preferences.color}
         onItemSizeChange={this.handleItemSize} onColorChange={this.handleColorChange} />
      </div>
   }
}
