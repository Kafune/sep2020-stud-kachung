import React from 'react'

import frontPageItems from '../frontpageData';

import ItemList from './ItemList';
import IFrameArea from './IFrameArea';



export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: frontPageItems,
         selectedValue: frontPageItems[1]
      }
      // document.getElementsByClassName('itemTitle').addEventListener('click', () => this.onSelectItem());
      this.onSelectItem = this.onSelectItem.bind(this);
   }

   onSelectItem(itemId) {
      console.log(itemId);
      this.setState({
         selectedValue: itemId
      });
   }



   render() {
      // const lijst = [{ naam: "Rowan" }, { naam: "Patrick" }];
      // const lijstmeth1 = [<h1>{"Rowan"}</h1>, <h1>{"Patrick"}</h1>];

      // const listItems = this.state.items(item => {
      //    <ListItem item={item} onClick={newFn}/>
      // })

      return <div className="App">
         <div id="ListPanel">
            <div className="ItemList">
               <div className="Logo">
                  <div className="colored">
                        RRHN
                  </div>
                  <div className="title">
                        Hacker News
                  </div>
               </div>
               <div id="ListMainContent">
                  {/* {lijst.map((naam) => <h1>{naam}</h1>)}
                  {lijst.map(function (persoon) {
                     return <h1 key={persoon.id}>{persoon.naam}</h1>
                  })} */}
                  <ItemList list={this.state.items} onSelect={this.onSelectItem}/>
               </div>
               <div id="ListFooter">
                  visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
            </div>
            </div>
         </div>

         <IFrameArea frameTarget={this.state.selectedValue}/>
      </div>
   }
}
