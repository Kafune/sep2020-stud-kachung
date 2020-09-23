import React from 'react';

export default function ListItem(props) {
   return <div className="Item">
      <div className="mainInfo">
         <ItemHeader item={props.item} onSelectItem={props.onSelectItem}/>
         <ItemFooter item={props.item}/>
      </div>
   </div>
}

function ItemHeader(props) {
   const loadURL = (e) => {
      e.preventDefault();
      props.onSelectItem(props.item);
   }
   return <div>
      <a className="itemTitle" onClick={loadURL} href={props.item.url}>{props.item.title}</a>
      <span className="domain">{props.item.title}</span>
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