const redux = require('redux');

const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';

const CHANGE_CLASSROOM = 'CHANGE_CLASSROOM';
const NO_CLASS = 'NO_CLASS';

function lokaal(state = null, action) {
    console.log(action);
    switch (action.type) {
        case CHANGE_CLASSROOM:
            return action.payload;
        case NO_CLASS:
            return null;
        default:
            return state;
    }
}

function classRoomReducer(state = [], action) {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case ADD_STUDENT:
            return [...state, action.payload];
        case REMOVE_STUDENT:
            return state.filter(student => student.id == action.payload);
        default:
            return state;
    }
}

const student1 = { name: 'Steven Velderman', id: 341908 }
const student2 = { name: 'Jade van Dinter', id: 903431 }

function addStudent(student) {
    return {
        type: ADD_STUDENT,
        payload: student
    }
}

const reducers = redux.combineReducers({
    lokaal,
    classRoomReducer
})

const store = redux.createStore(classRoomReducer);
store.subscribe(state => console.log(store.getState()));

//dispatch = data sturen naar de store
store.dispatch(addStudent(student1));
store.dispatch(addStudent(student2));
store.dispatch(addStudent({type: CHANGE_CLASSROOM, payload: "C0.19"}));


//zelfs in 1 action, wordt dit in alle reducers gestopt
// store.dispatch(addStudent(student1));

// const state0 = classroomReducer();
// console.log('initial state', state0);
// const state1 = classRoomReducer(state0, addStudent(student1));
// console.log("state1", state1);
