import { combineReducers } from 'redux'

import { ADD_TOUR,GET_TOURS_LIST,GET_ONE_TOUR,EDIT_TOUR,REMOVE_TOUR } from './types';

function InitialToursReducer (state = {
    tours: [],
    isInitial: true
    }, action) {
    const { tours  } = action;
    console.log('InitialToursReducer');
    switch (action.type) {
        case GET_TOURS_LIST:
        console.log('GET_TOURS_LIST');
           var reslist= Object.assign({}, state, {
                tourList:action.tours,
                isInitial: true
            });
            console.log(reslist);
            return reslist;
            
        case REMOVE_TOUR:
        console.log('REMOVE_TOUR');
            const tours = state.tourList.filter(tour => tour.id !== action.id );  
             var resultTourDelete = Object.assign({}, state, {             
                tourList  : tours,
                OpenTourDeleteDialog : false
            });             
            return resultTourDelete;

        case ADD_TOUR:
        console.log('ADD_TOUR'); 
            const resAdd = Object.assign({}, state, {
                tour:action.tour,
                ...state.tourList
            });
            console.log(resAdd);
            return resAdd;

        case EDIT_TOUR:
        console.log('EDIT_TOUR');     
             //find the index of object from array that you want to update
            // const objIndex = state.tourList.findIndex(tour => tour.id == action.tour.id);

            // // make new object of updated object.
            // const updatedObj = { ...state.tourList[objIndex],tour: action.tour};
            // console.log('updatedObj');
            // console.log(updatedObj);
            // // make final new array of objects by combining updated object.
            // const updatedProjects = [
            // ...state.tourList.slice(0, objIndex),
            // updatedObj,
            // ...state.tourList.slice(objIndex + 1),
            // ];
            // const resEdit = Object.assign({}, state, {
            //     tourList:updatedProjects
            // });
            // console.log(resEdit);
            //return resEdit;
            var res= Object.assign({}, state, {
                tour:action.tour 
            });
            console.log(res);
            return res;
            //return action.tour;

        case GET_ONE_TOUR:
        console.log('GET_ONE_TOUR'); 
            const resOneTour = Object.assign({}, state, {
                tour:action.tour
            });
            console.log(resOneTour);
            return resOneTour;
                
        default:
            return state;
    }
}
function CurrentToursReducer (state={
    tour: {},
    isFetching: true
    }, action) {
    const { tour } = action
    switch (action.type) {
        case GET_ONE_TOUR:
            return Object.assign({}, {
                tour,
                isFetching: false,
            })
        default:
            return state
    }
}
const AdminReducers = combineReducers({
  InitialToursReducer,
  CurrentToursReducer
})

export default AdminReducers; 