import React from 'react';
import {NavLink} from 'react-router-dom';

export default function ListItem(props) {

   return <div className="Item">
      <div className="mainInfo">
         <ItemHeader item={props.item} onSelectItem={props.onSelectItem} fetchedItems={props.fetchedItems}/>
         <ItemFooter item={props.item}/>
      </div>
   </div>
}

function ItemHeader(props) {
   // const domain = (props.item.url) ? props.item.url.split(' ://') : "";
   const loadURL = (e) => {

      props.onSelectItem(props.item);
      props.fetchedItems[props.item.id] = 'read';
      storeItemStatus(props.item.id, 'read');
   }

   const storeItemStatus = (id, status) => {
      const url = "http://localhost:3000/itemStatuses/" + id;
      const response = fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'text/plain'
        },
        body: status,
      }).catch(response => {
         if (!response.ok) {
            throw new Error(`HTTP PUT request went wrong: got "${response.statusText}" for "${url}"`)
          }
      })
    }

   return <div>
      {/* <a className="itemTitle" onClick={loadURL} href={props.item.url}>{props.item.title}</a> */}
      <NavLink className="itemTitle" key={props.item.id} to={`/item/${props.item.id}`} onClick={loadURL} >
      <span className="domain">{props.item.title}</span>
      </NavLink>
      <p>{props.fetchedItems[props.item.id]}</p>
   </div>
}

function ItemFooter(props) {
   const date = new Date(props.item.time);
   return <div className="info">
      {props.item.score}
      <span className="divider">|</span>by&nbsp;
 {props.item.by}
      <span className="divider">|</span>
      {new Intl.DateTimeFormat('en-GB').format(date)}
      <span className="divider">|</span>
      <a className="comments" href={"https://news.ycombinator.com/item?id=" + props.item.id}><strong>19</strong> comments</a>
   </div>
}