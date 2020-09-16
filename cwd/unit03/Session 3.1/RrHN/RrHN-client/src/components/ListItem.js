import React from 'react';

// {
//     "by": "fatiherikli",
//     "descendants": 665,
//     "id": 12115187,
//     "kids": [ 12115339, 12115359, 12115449 ],
//     "score": 18,
//     "time": 1468851891,
//     "title": "Show HN: Language Evolution Simulation",
//     "type": "story",
//     "url": "https://github.com/fatiherikli/language-evolution-simulation"
//  },


export default function ListItem(props) {
    const loadURL = (e) => {
        e.preventDefault();
        props.onSelectItem(props.item.id);
    }

    const date = new Date(props.item.time);
    return <div className="Item">
    <div className="mainInfo">
       <div>
          <a className="itemTitle" onClick={loadURL} href={props.item.url}>{props.item.title}</a>
          <span className="domain">{props.item.title}</span>
       </div>

       <div className="info">
          {props.item.score}
          <span className="divider">|</span>by&nbsp;
          {props.item.by}
          <span className="divider">|</span>
          {new Intl.DateTimeFormat('en-GB').format(date)}
          <span className="divider">|</span>
          <a className="comments" href={"https://news.ycombinator.com/item?id="+props.item.id}><strong>19</strong> comments</a>
       </div>
    </div>
 </div>
}