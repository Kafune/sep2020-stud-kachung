import React from 'react';
import ListItem from './ListItem';

export default function ItemList(props) {
    const lijst = props.list.slice(0, props.itemSize).map((listItem) => {
        return <ListItem key={listItem.id} item={listItem} onSelectItem={props.onSelect} fetchedItems={props.fetchedItems} />
    });
    return lijst;
}