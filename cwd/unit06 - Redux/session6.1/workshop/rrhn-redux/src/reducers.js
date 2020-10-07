import * as Redux from 'redux';

// dummy data, needed because this version does not do AJAX yet.
import initialFrontPageData from './frontPageData';
import initialItemStatuses from './itemStatuses';

//=====================================================================
//    State management for HN Items and their read/seen-statuses
//---------------------------------------------------------------------

// Action Creators:

const TOGGLE_ITEM = "toggleItemAction";

export function markAsSeenAction(listSize){
  return { type: "markAsSeenAction", listSize };
}
export function toggleItemAction(item){
  return { type: TOGGLE_ITEM, item };
}

// Reducer:

const initialHNItemsState = {
  items: initialFrontPageData,
  selectedItem: null,
  statuses: initialItemStatuses,
}

function hnItemsReducer( state = initialHNItemsState, action ) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch(action.type) {

  case TOGGLE_ITEM:
    if(state.selectedItem){
      if( action.item.id === state.selectedItem.id) {
        return { ...state, selectedItem: null };
      }
    }
    let newStatuses = { ...state.statuses, [action.item.id]: "read" };
    return { ...state, selectedItem: action.item, statuses: newStatuses };
    // break; not needed: this branch always returns from function

  case 'markAsSeenAction':
    newStatuses = { ...state.statuses };
    state.items.forEach((itm, idx) => {
      if(idx < action.listSize && state.statuses[itm.id] === undefined) {
        newStatuses[itm.id] = "seen";
      }
    })
    return { ...state, statuses:newStatuses };
    // break; not needed: this branch always returns from function

  default:
    return state;
  }
}

//=====================================================================
//    State management for the Preferences
//---------------------------------------------------------------------

// Action Creators:
const SHOW_PREFS = "showPrefsAction";
const SAVE_PREFS = "savePrefsAction";
const CLOSE_PREFS = "closePrefsAction";
const CHANGE_COLOR = "changeColorAction";
const CHANGE_ITEM_SIZE = "changeItemSizeAction"

export function showPrefsAction() {
  return { type: SHOW_PREFS };
}
// TODO: Add action creators for other redux-actions such as Cancel and OK, but also for editing controlled inputs for color and listSize.

export function closeAndApplyPrefsAction() {
  return {type: SAVE_PREFS}
}

export function closePrefsAction() {
  return {type: CLOSE_PREFS };
}

export function editColorAction(color) {
  return {type: CHANGE_COLOR, color};
}

export function editListSizeAction(itemSize) {
  return {type: CHANGE_ITEM_SIZE, itemSize}
}



// Reducer:

const initialPreferencesState = {
  showingPrefs:    false,
  editingColor:    null,
  editingListSize: null,
  currentColor:    "orange",
  currentListSize: 42
}

function preferencesReducer(state = initialPreferencesState, action) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch(action.type) {

  case SHOW_PREFS: 
    let changes = { showingPrefs:    true,
                    editingColor:    state.currentColor,
                    editingListSize: state.currentListSize
                  }
    return { ...state, ...changes };
    // break; not needed: this branch always returns from function
    
  // TODO: add case-branches to this swith that handle the other Actions that deal with the PreferencesDialog.

  default:
    return state;
  }
}

const CHANGE_QUERY = "CHANGE_QUERY";


export function changeQuery (query) {
  return {
    type: CHANGE_QUERY,
    payload: query
  }
}


function searchQueryReducer(state='', action) {
  switch(action.type) {
    case CHANGE_QUERY:
      return action.payload;
    default:
      return state;
  }
}
//===========================================================================
//  Combining the reducers and their state into a single reducer managing
//  a single state
//---------------------------------------------------------------------------


export const mainReducer = Redux.combineReducers({
  hnItems:  hnItemsReducer,
  prefs:    preferencesReducer,
  search:   searchQueryReducer,
})
