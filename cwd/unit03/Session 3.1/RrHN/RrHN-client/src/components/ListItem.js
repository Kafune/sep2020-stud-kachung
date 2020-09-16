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
        props.onClick(props.URL)
    }
    return <div className="Item">
    <div className="mainInfo">
        <ItemHeader item={props.item} />
        <ItemFooter item={props.item} />
       <div>
          <a className="itemTitle" onClick={loadURL} href={props.item.url}>{props.item.title}</a>
          <span className="domain">{props.item.title}</span>
       </div>

       <div className="info">
          {props.score}
          <span className="divider">|</span>by 
          {props.by}
          <span className="divider">|</span>
          July 18, 2016
          <span className="divider">|</span>
          <a className="comments" href="https://news.ycombinator.com/item?id=12114716"><strong>19</strong> comments</a>
       </div>
    </div>
 </div>
}


function ItemHeader(props){
    return {
        
    }
}

function ItemFooter(props){
    return {

    }
}