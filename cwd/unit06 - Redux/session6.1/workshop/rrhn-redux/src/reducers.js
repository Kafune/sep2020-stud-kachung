import * as Redux from 'redux';

// dummy data, needed because this version does not do AJAX yet.
import initialFrontPageData from './frontPageData';
import initialItemStatuses from './itemStatuses';

//=====================================================================
//    State management for HN Items and their read/seen-statuses
//---------------------------------------------------------------------

// Action Creators:

const TOGGLE_ITEM = "toggleItemAction";
const REQUEST_ITEMS = "requestItems"
const RECEIVE_ITEMS

export function markAsSeenAction(listSize) {
  return { type: "markAsSeenAction", listSize };
}
export function toggleItemAction(item) {
  return { type: TOGGLE_ITEM, item };
}

export function requestItems(items) {
  return {
    type: REQUEST_ITEMS,
    items
  }
}

export function receiveItems(items, json) {
  return
}

export function fetchItems(hnItem) {
  return function (dispatch) {
    dispatch(requestITems(hnItem));
    let url = 'http://localhost:3000/hn/topstories';
    return fetch(url)
    .then(response => {
      response.json();
    }).then(json => {
      dispatch(receiveItems(hnItem, json))
    })
  }
}
// Reducer:

const initialHNItemsState = {
  items: initialFrontPageData,
  selectedItem: null,
  statuses: initialItemStatuses,
}

function hnItemsReducer(state = initialHNItemsState, action) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch (action.type) {

    case TOGGLE_ITEM:
      if (state.selectedItem) {
        if (action.item.id === state.selectedItem.id) {
          return { ...state, selectedItem: null };
        }
      }
      let newStatuses = { ...state.statuses, [action.item.id]: "read" };
      return { ...state, selectedItem: action.item, statuses: newStatuses };
    // break; not needed: this branch always returns from function

    case 'markAsSeenAction':
      newStatuses = { ...state.statuses };
      state.items.forEach((itm, idx) => {
        if (idx < action.listSize && state.statuses[itm.id] === undefined) {
          newStatuses[itm.id] = "seen";
        }
      })
      return { ...state, statuses: newStatuses };
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
const CHANGE_COLOR = "editColorAction";
const CHANGE_ITEM_SIZE = "editListSizeAction";

export function showPrefsAction() {
  return { type: SHOW_PREFS };
}
// TODO: Add action creators for other redux-actions such as Cancel and OK, but also for editing controlled inputs for color and listSize.

export function closeAndApplyPrefsAction(preferences) {
  return { type: SAVE_PREFS, preferences }
}

export function closePrefsAction() {
  return { type: CLOSE_PREFS };
}

export function editColorAction(color) {
  return { type: CHANGE_COLOR, color };
}

export function editListSizeAction(itemSize) {
  return { type: CHANGE_ITEM_SIZE, itemSize }
}

// Reducer:

const initialPreferencesState = {
  showingPrefs: false,
  editingColor: null,
  editingListSize: null,
  currentColor: "orange",
  currentListSize: 42
}

function preferencesReducer(state = initialPreferencesState, action) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch (action.type) {

    case SHOW_PREFS:
      let changes = {
        showingPrefs: true,
        currentColor: state.currentColor,
        currentListSize: state.currentListSize,
        editingColor: state.editingColor,
        editingListSize: state.editingListSize
      }
      return { ...state, ...changes };
    // break; not needed: this branch always returns from function

    // TODO: add case-branches to this swith that handle the other Actions that deal with the PreferencesDialog.
    case CLOSE_PREFS:
      return {
        ...state, ...{
          showingPrefs: false
        }
      };

    case SAVE_PREFS:
      return {
        ...state, ...{
          showingPrefs: false,
          currentColor: state.editingColor,
          currentListSize: state.editingListSize
        }
      };
    case CHANGE_ITEM_SIZE:
      let newItemSize = {
        ...state.currentListSize,
        editingListSize: action.itemSize
      };
      console.log(action.itemSize)
      console.log(state.editingListSize);

      return { ...state, ...newItemSize }
    case CHANGE_COLOR:
      let newColor = {
        ...state.currentColor,
        editingColor: action.color
      }
      return { ...state, ...newColor };

    default:
      return state;
  }
}

const CHANGE_QUERY = "CHANGE_QUERY";


export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    payload: query
  }
}


function searchQueryReducer(state = '', action) {
  switch (action.type) {
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
  hnItems: hnItemsReducer,
  prefs: preferencesReducer,
  search: searchQueryReducer,
})
