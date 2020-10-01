import React from 'react'

import ItemList from './ItemList';
import Preferences from './Preferences';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function ShowPage(props) {
   console.log(props);

   return <iframe class="IFrameView" src={props.item.url} frameborder="0" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin" />
}

export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         preferences: {
            itemSize: 10,
            color: 'green'
         },
         itemStatus: [],
         isLoaded: false
      };
      // this.setPreference = this.setPreference.bind(this);
   };

   componentDidMount() {
      this.fetchItemStatus();
      this.fetchTopStories();
   }

   fetchItemStatus = () => {
      let url = 'http://localhost:3000/itemStatuses'
      fetch(url)
         .then(response => response.json())
         .then(result => {
            this.setState({
               itemStatus: result
            })
         })
   }

   fetchTopStories = () => {
      let url = 'http://localhost:3000/hn/topstories';
      fetch(url)
         .then(response => response.json())
         .then(result => {
            this.setState({
               items: result
            });
         })
   }

   onSelectItem = (item) => {
      // this.setState({
      //    selectedValue: item.url
      // });
      console.log(this.state.items);
      // return item;
   };

   handleItemSize = (itemSizeValue) => {
      this.setState({
         preferences: {
            ...this.state.preferences,
            itemSize: itemSizeValue
         }
      });
   };

   handleColorChange = (colorValue) => {
      this.setState({
         preferences: {
            ...this.state.preferences,
            color: colorValue
         }
      });
   };
   

   render() {
      const preferences = this.state.preferences;
      const logoColor = `ItemList ${preferences.color}`

      return <div className="App">
         <div id="ListPanel">
            <div className={logoColor} >
               <header id="ListHeader" class="panelHeader">
                  <div class="Logo">
                     <div className="colored">RrHN</div>
                     <div class="title">React-redux Hacker News</div>
                  </div>
                  <Link to="/preferences">
                     <span class="settingsIcon">
                        <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                           <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"></path>
                        </svg>
                     </span>
                  </Link>
               </header>
               <div id="ListMainContent">
                  <ItemList list={this.state.items} itemSize={preferences.itemSize}
                     fetchedItems={this.state.itemStatus}/>
               </div>
               <div id="ListFooter">
                  visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
            </div>
            </div>
         </div>
         <div id="ItemPanel">
            <Switch>
               <Route exact path="/">
                  <h2>No item selected yet.</h2>

                  <p>Select an item in the colum on the left.</p>
               </Route>
               <Route exact path="/preferences" render={(routeProps) => 
                  <Preferences itemSize={preferences.itemSize} color={preferences.color}
                  onItemSizeChange={this.handleItemSize} onColorChange={this.handleColorChange}
                  hidePrefs={this.handleClosePrefLog} applyPreferences={this.setPreferences} {...routeProps}/>
               }/>
               <Route path="/item/:id" render={(routeProps) => {
                  return <ShowPage item={this.state.items.find(item => item.id == routeProps.match.params.id)} />
               }
            }/>
            </Switch>
         </div>
      </div>
   }
}

