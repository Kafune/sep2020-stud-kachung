import React from 'react'
import {connect} from 'react-redux';

import {changeQuery} from './../reducers';


function SearchBar (props){
    console.log(props.query);

    function onChange (e) {
        props.changeQuery(e.target.value);
    }
    
    return <input value={props.query} onChange={onChange}/>
}

function mapStateToProps(state) {
    return {
        query: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeQuery: query => dispatch(changeQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);