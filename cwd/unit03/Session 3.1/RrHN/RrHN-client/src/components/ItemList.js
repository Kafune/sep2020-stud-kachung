import React from 'react';
import ListItem from './ListItem';


export default function ItemList(props) {
    const lijst = props.list.map((listItem) => {
        return <ListItem key={listItem.id} item={listItem} onSelectItem={props.onSelect} />
    });
    return lijst;
}